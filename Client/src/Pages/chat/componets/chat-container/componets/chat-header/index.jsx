
import {RiCloseFill} from 'react-icons/ri'
import { useAppStore } from '../../../../../../store'
import { getColor } from '../../../../../../lib/utils'
const ChatHeader = ()=> {
  const { closeChat, selectedChatData,selectedChatType } = useAppStore();

  if (!selectedChatData) {
    return null;
  }
  
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center  justify-center">
          {
            selectedChatType==="contact"?
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-500">
            {selectedChatData.image ? (
              <img
                src={`${HOST}/${selectedChatData?.image}`}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className={`uppercase flex items-center justify-center text-lg font-semibold rounded-full bg-gray-700 text-white ${getColor(
                  selectedChatData.color
                )}`}
              >
                {selectedChatData.firstName
                  ? selectedChatData.firstName[0]
                  : selectedChatData.email?.[0]?.toUpperCase() || ""}
              </div>
            )}
          </div>:<div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
            #
          </div>
          }
         

          <div>
            {selectedChatType==="contact" && selectedChatData.firstName?`${selectedChatData.firstName}  ${selectedChatData.lastName}`:selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:outline focus:outline-2 focus:outline-white focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default ChatHeader
