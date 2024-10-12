import { Message } from "../types/messageTypes";
import MessageRenderer from "./MessageRenderer";

const dummyMessages: Message[] = [
  {
    id: 1,
    content: "Hello, how are you?",
    type: "text",
    sender: "Alice",
    timestamp: new Date(),
  },
  {
    id: 2,
    content: "/chat.jpg",
    type: "image",
    sender: "Bob",
    timestamp: new Date(),
  },
  {
    id: 3,
    content: "User data displayed as table.",
    type: "table",
    sender: "Charlie",
    timestamp: new Date(),
  },
];

const MessageList: React.FC = () => {
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
      {dummyMessages.map((message) => (
        <MessageRenderer key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
