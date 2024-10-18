import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types/messageTypes";

const usePusher = (channelName: string, username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    Pusher.logToConsole = true;

    if (!pusherRef.current) {
      const pusher = new Pusher("2243c5b753a52d843878", {
        cluster: "eu",
        forceTLS: true,
      });

      const channel = pusher.subscribe(channelName);

      channel.bind("message", (data: Message) => {
        setMessages((prev) => {
          if (!prev.some((msg) => msg.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      });

      pusherRef.current = pusher;
    }

    return () => {
      if (pusherRef.current) {
        pusherRef.current.unsubscribe(channelName);
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }
    };
  }, [channelName]);

  const sendMessage = async (content: string | Blob[], type: string) => {
    const message: Message = {
      id: Date.now(),
      content,
      type,
      sender: username,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, channel: channelName }),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage };
};

export default usePusher;
