import { useState } from "react";
import { Message } from "../types/messageTypes";
import { AttachFile, Send } from "@mui/icons-material";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile } from "filepond";

registerPlugin(FilePondPluginImagePreview);

interface SendMessageFormProps {
  sendMessage: (message: Message) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState<string>("");
  const [files, setFiles] = useState<Blob[]>([]);
  const [pondInstance, setPondInstance] = useState<FilePond | null>(null);

  const handleSendMessage = () => {
    if (input || files.length > 0) {
      const newMessage: Message = {
        id: Date.now(),
        content: input || URL.createObjectURL(files[0]),
        type:
          files.length > 0
            ? files[0].type.startsWith("image/")
              ? "image"
              : "file"
            : "text",
        sender: "You",
        timestamp: new Date(),
      };

      sendMessage(newMessage);
      setInput("");
      setFiles([]);
      pondInstance?.removeFiles();
    }
  };

  const handleFileUpload = (filePondFiles: FilePondFile[]) => {
    const file = filePondFiles[0]?.file;
    if (file) {
      setFiles([file]);
    }
  };

  const handleFileRemove = () => {
    setFiles([]);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center space-x-3 w-full max-w-full bg-white ">
        <label
          htmlFor="file-upload"
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
          aria-label="Attach file"
          onClick={() => pondInstance?.browse()}
        >
          <AttachFile />
        </label>

        <div className="w-full h-fit">
          <FilePond
            ref={(pond) => setPondInstance(pond)}
            allowMultiple={false}
            onupdatefiles={handleFileUpload}
            onremovefile={handleFileRemove}
            acceptedFileTypes={["image/*", "application/json"]}
            labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
            className="custom-filepond"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 w-full max-w-full bg-white">
        <input
          type="text"
          className="flex-grow p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Type message here"
          aria-label="Message input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-150 ease-in-out"
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default SendMessageForm;
