import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../components/ui/tooltip";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { apiClient } from "../../../../../lib/api-client";
import { useAppStore } from "@/store";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTES } from "../../../../../utils/constants";
import { Button } from "../../../../../components/ui/button";
import MultipleSelector from "../../../../../components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, setSelectedChatMessage,addChannel } =
    useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
          withCredentials: true,
        });
        if (response.data && response.data.contacts) {
          setAllContacts(response.data.contacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      if (channelName.length > 0 && selectedContacts.length > 0) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTE,
          {
            name: channelName,
            members: selectedContacts.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
    
        
        if (response.status === 201) {
          setChannelName("");
          setSelectedContacts([]);
          setNewChannelModal(false);
          addChannel(response.data.channel); 
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } else {
        console.error("Channel Name or Members are invalid");
      }
    } catch (error) {
      console.error("Error creating channel:", error.response?.data || error.message);
    }
  };
  
  

  // return (
  // <>
  //   <TooltipProvider>
  //     <Tooltip>
  //       <TooltipTrigger>
  //         <FaPlus
  //           className="text-neutral-400 font-light top-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all"
  //           onClick={() => setNewChannelModal(true)}
  //         />
  //       </TooltipTrigger>
  //       <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
  //         Create New Channel
  //       </TooltipContent>
  //     </Tooltip>
  //   </TooltipProvider>

  //   <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
  //     <DialogTrigger />
  //     <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-auto flex flex-col gap-4 p-6">
  //       <DialogHeader>
  //         <DialogTitle>Please fill up the details for the new channel</DialogTitle>
  //         <DialogDescription />
  //       </DialogHeader>

  //       <div className="mt-2">
  //         <Input
  //           placeholder="Channel Name"
  //           className="rounded-lg p-4 bg-[#2c2e3b] border-none text-white"
  //           onChange={(e) => setChannelName(e.target.value)}
  //           value={channelName}
  //         />
  //       </div>

  //       <div className="mt-2">
  //         <MultipleSelector
  //           className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
  //           defaultOptions={allContacts}
  //           placeholder="Search Contacts"
  //           value={selectedContacts}
  //           onChange={setSelectedContacts}
  //           emptyIndicate={
  //             <p className="text-center text-lg leading-10 text-gray-600">
  //               No Result Found!
  //             </p>
  //           }
  //         />
  //       </div>

  //       <div className="mt-4">
  //         <Button
  //           className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 py-2 text-lg font-semibold"
  //           onClick={createChannel}
  //         >
  //           Create Channel
  //         </Button>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // </>
// );

};

export default CreateChannel;
