import { useState } from "react";
import { Modal } from "@mui/material";
import { Message } from "../types/messageTypes";

interface SendMessageFormProps {
  sendMessage: (message: Message) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    setOpen(false);
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
        <>
          <img
            src={imagePreview}
            alt="Preview"
            className="h-16 w-16 object-cover cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <button
            className="p-2 bg-red-500 text-white rounded-md"
            onClick={handleRemoveImage}
          >
            Remove Image
          </button>
        </>
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="relative flex items-center justify-center h-screen">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-white p-2 rounded-full shadow-lg cursor-pointer"
          >
            X
          </button>
          <img
            src={imagePreview!}
            alt="Preview"
            className="max-w-full max-h-full object-cover"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SendMessageForm;
