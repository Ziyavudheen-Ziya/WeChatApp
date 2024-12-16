import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar } from "../../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { colors ,getColor} from "../../lib/utils"; 
// import getColor from '../../lib/utils'
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { ADD_PROFILE_IMG_ROUTES, DELETE_FORFILE_IMAGE, UPDATE_PROFILE_ROUTE } from "../../utils/constants";
import HOST from "../../utils/constants";
const Profile = () => {
  const navigate = useNavigate();
  const { userInfo,setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null)

  



  useEffect(()=>{

    if(userInfo.profile){

        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
        setSelectedColor(userInfo.color)
    }
    console.log(userInfo.image);
    
    if(userInfo?.image){
      setImage(`${HOST}/${userInfo.image}`)
    }
  },[userInfo,setImage])


  const validateProfile = ()=>{

     if(!firstName){
      toast.error("First name is required")
      return false
     }

     if(!lastName){
      toast.error("Last name is required")
      return false
     }

     return true
  }
  const saveChanges = async () => {

    if(validateProfile()){
      
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{firstName,lastName,color:selectedColor},{withCredentials:true})
        console.log(response.data);
        
        if(response.status===200 && response.data){

          setUserInfo({...response.data})
          toast.success("Profile updated successfully")
          navigate('/chat')
        }
      } catch (error) {
        console.log(error);
        
      }
    }
   
  };

  const handleNavigate = ()=>{

    if(userInfo.profile){

      navigate('/chat')
    }else{
      toast.error("Please setUp profile")
    }
  }
const hanldeFileInputClick = ()=>{
  fileInputRef.current.click();
}

const handleImageChange = async(event)=>{

  const file = event.target.files[0]
  if(file){
    
    const formData = new FormData();
    formData.append("profile-image",file)
    const response = await apiClient.post(ADD_PROFILE_IMG_ROUTES,formData,{withCredentials:true})
  
    console.log(response.data);
    
    if(response.status===200 && response.data.image){

      setUserInfo({...userInfo,image:response.data.image})


      
      toast.success("Image updated successfully")


    }

    const reader = new FileReader();
     reader.onload= ()=>{

        setImage(reader.result)
     }
   reader.readAsDataURL(file)

  }

}

const handleDeleteImage= async ()=>{
try {
  const response = await apiClient.delete(DELETE_FORFILE_IMAGE,{withCredentials:true})

  if(response.status==200){
    setUserInfo({...userInfo,image:null})
    toast.success("Image removed successfully")
    setImage(null)
  }
} catch (error) {
  console.log(error);
  
}

}
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-full max-w-[80vw] md:w-max">
        {/* Back Button */}
        <div onClick={handleNavigate}>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Avatar Section */}
          <div
            className="h-32 w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="Profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 flex items-center justify-center text-5xl border-[1px] rounded-full ${getColor(
                    { color: selectedColor }
                  )}`}
                >
                  {firstName
                    ? firstName[0]
                    : userInfo.email?.[0]?.toUpperCase() || ""}
                </div>
              )}
            </Avatar>

            {/* Hover Actions */}
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
              onClick={image?handleDeleteImage:hanldeFileInputClick}
              >
                {image ? (
                  <FaTrash
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => setImage(null)}
                  />
                ) : (
                  <FaPlus
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => console.log("Add image logic")}
                  />
                )}
              </div>
            )}

            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp"  />
          </div>

          {/* User Info Section */}
          <div className="flex flex-col gap-5 text-white w-full items-center">
            {/* Email Field */}
            <input
              placeholder="Email"
              type="email"
              disabled
              value={userInfo.email}
              className="rounded-lg p-4 bg-[#2c2e3b] border-none w-full"
            />

            {/* First Name Field */}
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg p-4 bg-[#2c2e3b] border-none w-full"
            />

            {/* Last Name Field */}
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg p-4 bg-[#2c2e3b] border-none w-full"
            />

            {/* Color Selection */}
            <div className="flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index ? "outline outline-2 outline-white" : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="w-full">
          <button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 rounded-lg text-white text-lg font-semibold"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

