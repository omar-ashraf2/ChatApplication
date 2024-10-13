import { useState } from "react";
import { Message } from "../types/messageTypes";

interface SendMessageFormProps {
  sendMessage: (message: Message) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input) {
      const newMessage: Message = {
        id: Date.now(),
        content: input,
        type: "text",
        sender: "User",
        timestamp: new Date(),
      };

      sendMessage(newMessage);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md flex items-center space-x-4">
      <input
        type="text"
        className="flex-grow p-2 border rounded-md"
        placeholder="Type your message..."
        aria-label="Message input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSendMessage}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessageForm;
