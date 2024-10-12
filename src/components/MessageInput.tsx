import { useState } from "react";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("Send message:", message);
    setMessage("");
  };

  return (
    <div className="p-4 bg-white shadow-md flex items-center space-x-4">
      <input
        type="text"
        className="flex-grow p-2 border rounded-md"
        placeholder="Type your message..."
        aria-label="Message input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={sendMessage}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
