import { useState } from "react";
import { Modal } from "@mui/material";
import { Message } from "../types/messageTypes";
import {
  AttachFile,
  Close,
  Delete,
  Send,
  Description,
} from "@mui/icons-material";

interface SendMessageFormProps {
  sendMessage: (message: Message) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
      setPreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else if (selectedFile) {
      setPreview(selectedFile.name);
    }
    setFile(selectedFile || null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4 space-y-4">
      {preview && (
        <div className="relative flex items-center justify-center w-fit">
          {file?.type.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover cursor-pointer rounded-lg shadow-lg"
              onClick={() => setOpen(true)}
            />
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg shadow-md">
              <Description style={{ fontSize: 30 }} />
              <span className="text-gray-700 font-medium">{preview}</span>
            </div>
          )}
          <button
            className="absolute top-0 -right-8 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
            onClick={handleRemoveFile}
          >
            <Delete style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      )}

      <div className="p-4 flex items-center space-x-3 w-full max-w-full">
        <input
          type="text"
          className="flex-grow p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Type your message..."
          aria-label="Message input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-600 transition duration-150 ease-in-out"
          aria-label="Upload file"
        >
          <AttachFile />
        </label>

        <button
          className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-150 ease-in-out"
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="relative flex items-center justify-center h-screen bg-black bg-opacity-70">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center"
          >
            <Close />
          </button>
          {file?.type.startsWith("image/") && (
            <img
              src={preview!}
              alt="Preview"
              className="max-w-full max-h-full object-cover rounded-lg"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SendMessageForm;
