import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./componets/contacts-container";
import EmptyChatContainer from "./componets/empty-chat-container";
import ChatContainer from "./componets/chat-container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profile) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && <div className="h-[100vh] w-[100-vw] fixed top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Uplodading File</h5>
          {fileUploadProgress}%
        </div>
      }
       {
        isDownloading && <div className="h-[100vh] w-[100-vw] fixed top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl animate-pulse">Downloading</h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactContainer />
      {selectedChatType == undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
