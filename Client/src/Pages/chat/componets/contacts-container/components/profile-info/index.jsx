import { useAppStore } from "../../../../../../store";
import HOST, { LOGIN_ROUTE, LOGOUT } from "../../../../../../utils/constants";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../../../lib/api-client";
import { getColor } from "../../../../../../lib/utils";
const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT,
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center px-4 w-full bg-[#2a2b33]">
      <div className="flex items-center gap-3">
        {/* Avatar Section */}
        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-500">
          {userInfo.image ? (
            <img
              src={`${HOST}/${userInfo.image}`}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className={`uppercase flex items-center justify-center text-lg font-semibold rounded-full bg-gray-700 text-white ${getColor(
                { color: userInfo.color }
              )}`}
            >
              {userInfo.firstName
                ? userInfo.firstName[0]
                : userInfo.email?.[0]?.toUpperCase() || ""}
            </div>
          )}
        </div>

        {/* User Info Section */}
        <div className="text-sm text-gray-300">
          {userInfo.firstName && userInfo.lastName ? (
            <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
          ) : (
            <span>{userInfo.email || "Anonymous User"}</span>
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-xl font-medium"
                onClick={logOut}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
