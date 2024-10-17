import { CloudDownloadOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Message } from "../types/messageTypes";
import DataTable from "./DataTable";

interface MessageProps {
  message: Message;
}

const MessageRenderer: React.FC<MessageProps> = ({ message }) => {
  const { content, type, sender } = message;
  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div {...animationProps} className="mb-4 flex items-start space-x-3">
      <img
        src={"https://randomuser.me/api/portraits/men/1.jpg"}
        alt={sender}
        className="h-10 w-10 rounded-full"
      />
      <div>
        <span className="text-[#868686] text-sm">{sender}</span>
        <div>
          {type === "text" && <p className="mt-1 text-gray-800">{content}</p>}
          {type === "image" && (
            <img
              src={content}
              alt="Sent image"
              className="mt-1 h-40 w-fit object-cover rounded-lg shadow-lg cursor-pointer"
              onClick={() => window.open(content, "_blank")}
            />
          )}
          {type === "file" && (
            <div>
              <a
                href={content}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center rounded-md w-fit p-3 shadow-md text-blue-600 font-medium"
              >
                <CloudDownloadOutlined /> Download File
              </a>
            </div>
          )}
          {type === "table" && (
            <div className="mt-2">
              <DataTable data={JSON.parse(content)} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageRenderer;
