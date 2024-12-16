import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "../../../../../../lib/utils";
import { apiClient } from "../../../../../../lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "../../../../../../utils/constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getColor } from "../../../../../../lib/utils";
import { useAppStore } from "../../../../../../store";
import HOST from "../../../../../../utils/constants";

const NewDm = () => {

const {setSelectedChatType,setSelectedChatData,setSelectedChatMessage} = useAppStore()

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const serachContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        console.log(response.data);

        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contacts)=>{
    setOpenNewContactModal(false)
    setSelectedChatType("contact")
    setSelectedChatData(contacts)
    setSearchedContacts([])

  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light top-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all "
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle> Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => serachContacts(e.target.value)}
            />
          </div>



          <ScrollArea className="h-[250px]">
            <div className=" flex flex-col gap-5">
              {searchedContacts.map((contacts) => (
                <div
                  key={contacts._id}
                  onClick={()=>selectNewContact(contacts)}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-500">
                    {contacts.image ? (
                      <img
                        src={`${HOST}/${contacts.image}`}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div
                        className={`uppercase flex items-center justify-center text-lg font-semibold rounded-full bg-gray-700 text-white ${getColor(
                          contacts.color
                        )}`}
                      >
                        {contacts.firstName
                          ? contacts.firstName[0]
                          : contacts.email?.[0]?.toUpperCase() || ""}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <span>
                      {contacts.firstName && contacts.lastName ? (
                        <span>{`${contacts.firstName} ${contacts.lastName}`}</span>
                      ) : (
                        <span>{contacts.email || "Anonymous User"}</span>
                      )}
                    </span>
                    <span className="text-xs">{contacts.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {searchedContacts.length <= 0 && (
            <div className="flex-1  md:flex mt-5 md:mt-0 flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex-col gap-5 items-center mt-5 lg:text-2xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span>Search new
                  <span className="text-purple-500"> contacts </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
