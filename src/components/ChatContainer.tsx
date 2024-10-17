import { usePusher } from "../hooks/usePusher";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import UserList from "./UserList";

const ChatContainer: React.FC = () => {
  const { messages, sendMessage } = usePusher("my-channel");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <UserList />
      <div className="flex-1 w-full flex flex-col h-full">
        <MessageList messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
