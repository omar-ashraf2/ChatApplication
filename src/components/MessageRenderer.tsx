import { motion } from "framer-motion";
import { Message } from "../types/messageTypes";
import DataTable from "./DataTable";
import { useState } from "react";
import { Modal } from "@mui/material";

interface MessageProps {
  message: Message;
}

const MessageRenderer: React.FC<MessageProps> = ({ message }) => {
  const { content, type, sender } = message;
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleImageClick = (src: string) => {
    setImageSrc(src);
    setOpen(true);
  };

  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  };

  const senderAvatar =
    sender === "You"
      ? "https://randomuser.me/api/portraits/men/99.jpg"
      : "https://randomuser.me/api/portraits/men/10.jpg";

  return (
    <motion.div {...animationProps} className="mb-4 flex items-start space-x-4">
      <img src={senderAvatar} alt={sender} className="h-8 w-8 rounded-full" />
      <div>
        <span className="text-[#868686] text-sm">{sender}</span>
        {type === "text" && <p>{content}</p>}
        {type === "image" && (
          <>
            <img
              className="max-w-xs cursor-pointer"
              src={content}
              alt="message"
              onClick={() => handleImageClick(content)}
            />
            <Modal open={open} onClose={() => setOpen(false)}>
              <div className="relative flex items-center justify-center h-screen">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-white p-2 rounded-full shadow-lg cursor-pointer"
                >
                  X
                </button>
                <img
                  src={imageSrc!}
                  alt="Preview"
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            </Modal>
          </>
        )}
        {type === "file" && (
          <a href={content} download className="text-blue-600 underline">
            Download file
          </a>
        )}
        {type === "table" && <DataTable data={JSON.parse(content)} />}
      </div>
    </motion.div>
  );
};

export default MessageRenderer;
