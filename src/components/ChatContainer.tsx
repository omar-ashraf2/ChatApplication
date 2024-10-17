import { useState, useEffect } from "react";
import { usePusher } from "../hooks/usePusher";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import UserList from "./UserList";
import { Message } from "../types/messageTypes";

const ChatContainer: React.FC = () => {
  const [activeUser, setActiveUser] = useState<string>("Alice");
  const { messages: realTimeMessages, sendMessage } = usePusher(
    `chat-${activeUser}`
  );
  const [chats, setChats] = useState<{ [key: string]: Message[] }>({});

  useEffect(() => {
    if (realTimeMessages.length > 0) {
      setChats((prevChats) => ({
        ...prevChats,
        [activeUser]: [...(prevChats[activeUser] || []), ...realTimeMessages],
      }));
    }
  }, [realTimeMessages, activeUser]);

  const handleSendMessage = (message: Message) => {
    setChats((prevChats) => ({
      ...prevChats,
      [activeUser]: [...(prevChats[activeUser] || []), message],
    }));
    sendMessage(message);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <UserList setActiveUser={setActiveUser} activeUser={activeUser} />
      <div className="flex-1 w-full flex flex-col h-full">
        <MessageList messages={chats[activeUser] || []} />
        <SendMessageForm sendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
