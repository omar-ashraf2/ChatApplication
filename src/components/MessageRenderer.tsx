import { motion } from "framer-motion";
import DataTableMessage from "./DataTableMessage";
import { Message } from "../types/messageTypes";

interface MessageProps {
  message: Message;
}

const MessageRenderer: React.FC<MessageProps> = ({ message }) => {
  const { content, type } = message;
  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div {...animationProps} className="mb-4">
      {type === "text" && <p>{content as string}</p>}

      {type === "image" && (
        <img
          className="max-w-xs cursor-pointer"
          src={content as string}
          alt="message"
          onClick={() => window.open(content as string, "_blank")}
        />
      )}

      {type === "table" && Array.isArray(content) && (
        <DataTableMessage data={content as { [key: string]: unknown }[]} />
      )}
    </motion.div>
  );
};

export default MessageRenderer;
