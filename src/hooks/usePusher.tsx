import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Message } from "../types/messageTypes";

export const usePusher = (channelName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const pusher = new Pusher("2243c5b753a52d843878", {
      cluster: "eu",
    });

    const channel = pusher.subscribe(channelName);

    channel.bind("my-event", function (data: Message) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName]);

  const sendMessage = async (message: Message) => {
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage };
};
