import { useEffect, useState } from "react";
import { users } from "../constants/users";
import usePusher from "../hooks/usePusher";
import { Message } from "../types/messageTypes";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import UserList from "./UserList";

const ChatContainer: React.FC<{ username: string }> = ({ username }) => {
  const { messages: realTimeMessages, sendMessage } = usePusher(
    `chat-room`,
    username
  );
  const [chats, setChats] = useState<{ [key: string]: Message[] }>({});
  const [activeUser, setActiveUser] = useState<string | null>(users[0].name);

  useEffect(() => {
    if (realTimeMessages.length > 0 && activeUser) {
      setChats((prevChats) => ({
        ...prevChats,
        [activeUser]: [...(prevChats[activeUser] || []), ...realTimeMessages],
      }));
    }
  }, [realTimeMessages, activeUser]);

  const handleSendMessage = (content: string | Blob[], type: string) => {
    if (activeUser) {
      const message: Message = {
        id: Date.now(),
        content,
        type,
        sender: username,
        timestamp: new Date().toISOString(),
      };
      setChats((prevChats) => ({
        ...prevChats,
        [activeUser]: [...(prevChats[activeUser] || []), message],
      }));
      sendMessage(content, type);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <UserList
        users={users}
        setActiveUser={setActiveUser}
        activeUser={activeUser}
      />
      <div className="flex-1 w-full md:w-3/4 flex flex-col h-full">
        <MessageList messages={chats[activeUser || username] || []} />
        <SendMessageForm sendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
