import { useState } from "react";
import { Message } from "../types/messageTypes";

interface SendMessageFormProps {
  sendMessage: (message: Message) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (input || file) {
      const newMessage: Message = {
        id: Date.now(),
        content: input || URL.createObjectURL(file!),
        type: file
          ? file.type.startsWith("image/")
            ? "image"
            : "file"
          : "text",
        sender: "You",
        timestamp: new Date(),
      };

      sendMessage(newMessage);
      setInput("");
      setFile(null);
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(selectedFile));
    }
    setFile(selectedFile || null);
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
      <input
        type="file"
        className="p-2 hidden"
        id="file-upload"
        onChange={handleFileChange}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="h-16 w-16 object-cover"
        />
      )}
      <label
        htmlFor="file-upload"
        className="p-2 bg-blue-500 text-white rounded-md cursor-pointer"
        aria-label="Upload file"
      >
        Upload
      </label>
      <button
        className="p-2 bg-green-500 text-white rounded-md"
        onClick={handleSendMessage}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessageForm;
