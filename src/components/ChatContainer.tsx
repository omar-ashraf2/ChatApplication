import { usePusher } from "../hooks/usePusher";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

const ChatContainer: React.FC = () => {
  const { messages, sendMessage } = usePusher("my-channel");

  return (
    <div className="w-3/4 flex flex-col h-full">
      <MessageList messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
