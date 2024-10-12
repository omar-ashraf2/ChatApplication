import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatContainer: React.FC = () => {
  return (
    <div className="w-3/4 flex flex-col h-full">
      <MessageList />
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
