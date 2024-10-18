import { AttachFile, Send } from "@mui/icons-material";
import { FilePondFile } from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import Papa from "papaparse";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
registerPlugin(FilePondPluginImagePreview);

interface SendMessageFormProps {
  sendMessage: (content: string | Blob[], type: string) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [input, setInput] = useState<string>("");
  const [files, setFiles] = useState<Blob[]>([]);
  const [pondInstance, setPondInstance] = useState<FilePond | null>(null);

  const handleSendMessage = async () => {
    if (input || files.length > 0) {
      let content = input;

      if (files.length > 0) {
        const file = files[0];

        if (file.type === "application/json") {
          const fileContent = await file.text();
          content = JSON.stringify(JSON.parse(fileContent), null, 2);
        } else if (file.type === "text/csv") {
          const fileContent = await file.text();
          const parsedCSV = Papa.parse(fileContent, { header: true });
          content = JSON.stringify(parsedCSV.data);
        } else {
          content = URL.createObjectURL(file);
        }
      }
      const type =
        files.length > 0
          ? files[0].type === "application/json" || files[0].type === "text/csv"
            ? "table"
            : files[0].type.startsWith("image/")
            ? "image"
            : "file"
          : "text";
      sendMessage(content, type);
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

  return (
    <div className="w-full p-4">
      <div className="flex items-center space-x-3 w-full max-w-full bg-white">
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
            onremovefile={() => setFiles([])}
            acceptedFileTypes={["image/*", "application/json", "text/csv"]}
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
