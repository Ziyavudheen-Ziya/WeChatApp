import { Avatar, AvatarImage } from "./avatar";
import { useAppStore } from "../../store";
import HOST from "../../utils/constants";
import { getColor } from "../../lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessage,
  } = useAppStore();

  const handleClick = (contact) => {
    setSelectedChatType(isChannel ? "channel" : "contact");
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer flex items-center gap-4 ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-500">
            {contact.image ? (
              <img
                src={`${HOST}/${contact.image}`}
                alt="Contact Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className={`${
                  selectedChatData && selectedChatData._id === contact._id
                    ? "bg-[#ffffff22] border border-white/70"
                    : getColor(contact.color)
                } flex items-center justify-center text-lg font-semibold rounded-full text-white w-full h-full`}
              >
                {contact.firstName
                  ? contact.firstName[0].toUpperCase()
                  : contact.name.toUpperCase()
                  ? contact.name[0].toUpperCase()
                  : contact.email[0].toUpperCase()}
              </div>
            )}
          </div>

          <div>
            {isChannel ? (
              <span className="text-neutral-300">{contact.name}</span>
            ) : (
              <span className="text-neutral-300">
                {`${contact.firstName} ${contact.lastName}`.trim() ||
                  contact.email}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
