import { useEffect, useState } from "react";
import {
  connectToSocket,
  subscribeToMessages,
  sendMessage,
} from "../services/websocket";
import { Message } from "../types/messageTypes";

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = connectToSocket(url);

    subscribeToMessages((message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  const sendNewMessage = (message: Message) => {
    sendMessage(message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { messages, sendNewMessage };
};
