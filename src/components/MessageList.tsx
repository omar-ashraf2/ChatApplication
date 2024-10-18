import { Message } from "../types/messageTypes";
import MessageRenderer from "./MessageRenderer";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow p-4 overflow-auto bg-gray-50">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageRenderer key={message.id} message={message} />
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default MessageList;
