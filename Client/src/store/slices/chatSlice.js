export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContact:[],
  isUploading:false,
  isDownloading:false,
  fileUploadProgress:0,
  fileDownloadProgress:0,
  channels:[],
  setChannels:(channels)=>set({channels}),
  setIsUploading:(isUploading=>set({isUploading})),
  setIsDownloading:(isDownloading=>set({isDownloading})),
  setFileUploadProgress:(fileUploadProgress=>set({fileUploadProgress})),
  setFileDownloadProgress:(fileDownloadProgress=>set({fileDownloadProgress})),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessages) =>set ({ selectedChatMessages }),
  setDirectMessagesContact:(directMessagesContact)=>set({directMessagesContact}),
  addChannel:(channel)=>{
   const channels = get().channels
   set({channels:[channel,...channels]})
  },
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
    addMessage: (message) => {
      const selectedChatMessages = get().selectedChatMessages;
      const selectedChatType = get().selectedChatType;
    
      set({
        selectedChatMessages: [
          ...selectedChatMessages,
          {
            ...message,
            recipient:
              selectedChatType === "channel"
                ? message.recipient
                : message.recipient._id,
            sender:
              selectedChatType === "channel"
                ? message.sender // Fix this line
                : message.sender._id, // Fix this line
          },
        ],
      });
    },
    
});


// addMessage: (message) => {
//   const selectedChatMessages = get().selectedChatMessages;
//   const selectedChatType = get().selectedChatType;

//   set({
//     selectedChatMessages: [
//       ...selectedChatMessages,
//       {
//         ...message,
//         recipient:
//           selectedChatType === "channel"
//             ? message.recipient
//             : message.recipient._id,
//         sender:
//           selectedChatType === "channel"
//             ? message.recipient
//             : message.recipient._id,
//       },
//     ],
//   });
// },