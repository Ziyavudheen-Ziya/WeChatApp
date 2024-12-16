import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessagesModal.js";

export const searchContacts = async (req, res) => {
  try {

    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    console.log("sanitize terms", sanitizedSearchTerm);

    const regex = new RegExp(sanitizedSearchTerm, "i");

    if (!req.userId) {
      return res.status(401).json({ error: "User is not authenticated" });
    }
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });


    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error in searchContacts:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getContactsForDMList = async (req, res) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      { $match: { $or: [{ sender: userId }, { recipient: userId }] } },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },

          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error in searchContacts:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllContacts = async (req, res) => {
  try {
  
      const users = await User.find({_id:{$ne:req.userId}},"firstName lastName _id email")
  
      const contacts = users.map((user)=>({
          label: user.firstName?`${user.firstName} ${user.lastName}`:user.email,
          value:user._id
        }))
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error in searchContacts:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
