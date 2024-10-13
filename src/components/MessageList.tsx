import { Message } from "../types/messageTypes";
import MessageRenderer from "./MessageRenderer";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <MessageRenderer key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
