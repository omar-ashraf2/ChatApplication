import { motion } from "framer-motion";
import { Message } from "../types/messageTypes";
import DataTableMessage from "./DataTableMessage";

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
    <motion.div {...animationProps} className="mb-4">
      <strong>{sender}</strong> 
      {type === "text" && <p>{content}</p>}
      {type === "image" && (
        <img
          className="max-w-xs cursor-pointer"
          src={content}
          alt="message"
          onClick={() => window.open(content, "_blank")}
        />
      )}
      {type === "file" && (
        <a href={content} download className="text-blue-600 underline">
          Download file
        </a>
      )}
      {type === "table" && <DataTableMessage data={JSON.parse(content)} />}
    </motion.div>
  );
};

export default MessageRenderer;
