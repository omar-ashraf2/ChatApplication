import { io, Socket } from "socket.io-client";
import { Message } from "../types/messageTypes";
let socket: Socket;

export const connectToSocket = (url: string) => {
  socket = io(url);
  return socket;
};

export const sendMessage = (message: Message) => {
  if (socket) {
    socket.emit("sendMessage", message);
  }
};

export const subscribeToMessages = (callback: (message: Message) => void) => {
  if (socket) {
    socket.on("message", callback);
  }
};
