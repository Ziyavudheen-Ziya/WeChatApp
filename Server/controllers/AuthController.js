import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import path from "path";
import jwt from "jsonwebtoken";
import { existsSync, renameSync, mkdirSync, unlinkSync } from "fs";
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
export const signup = async (req, res) => {
  try {
    console.log("Data is comming");

    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("Email password required");
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    console.log("Entring");
    console.log("user data is comming from mongoDb ", user);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("Email password required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User is not found");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const getUserInfo = async (req, res) => {
  try {
    console.log("user varunilla", req.userId);
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).send("User with given ID is not found");
    }

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profile: userData.profile,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    console.log("userId", userId);
    const { firstName, lastName, color } = req.body;
    console.log("Data varunde getUserINFo", req.body);

    if (!firstName || !lastName) {
      return res.status(404).send("Firstname,lastname, adn color is required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profile: true,
        
      },
      { new: true, runValidators: true }
    );

    console.log("userData from backend", userData);

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profile: userData.profile,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};


export const profileImageUpdate = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).send("File is required");
      }

      const date = Date.now();
      const fileName = `uploads/profiles/${date}-${req.file.originalname}`;
      const targetDir = path.dirname(fileName);

     
      if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
      }

     
      if (!existsSync(req.file.path)) {
          return res.status(400).send("File not found at the source path");
      }

      renameSync(req.file.path, fileName);

      const updateUser = await User.findByIdAndUpdate(
          req.userId,
          { image: fileName },
          { new: true, runValidators: true }
      );

      return res.status(200).json({ image: updateUser.image });
  } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
  }
};

export const deleteProfileImage = async (req, res) => {
  try {
      const { userId } = req;

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send("User not found");
      }

      if (user.image && existsSync(user.image)) {
          unlinkSync(user.image); 
      } else {
          console.log("No valid image found to delete");
      }

      user.image = null;
      await user.save();

      return res.status(200).send("Profile image removed successfully");
  } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
  }
};



export const logOut = async (req, res) => {
  try {

   res.cookie("jwt","",{maxAge:1,secure:true,sameSite:"None"})
   
      return res.status(200).send("Logou successfully");
  } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
  }
};
