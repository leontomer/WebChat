import { io, Socket } from "socket.io-client";

let socket: Socket;

const connectSocket = (roomId: string) => {
  socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });
  socket.emit("joinRoom", roomId);
};

const sendMessage = (
  roomId: string,
  message: string,
  sender: string | null | undefined,
  recipient: string | null | undefined
) => {
  socket.emit("sendMessage", { roomId, message, sender, recipient });
};

const onReceiveMessage = (
  callback: (
    chatId: string,
    sender: string | null | undefined,
    recipient: string | null | undefined,
    message: string,
    timestamp: Date
  ) => void
) => {
  socket.on(
    "receiveMessage",
    ({ chatId, sender, recipient, message, timestamp }) => {
      callback(chatId, sender, recipient, message, timestamp);
    }
  );
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

const getChatHistory = (setMessages: any) => {
  socket.on("chatHistory", (messages) => {
    setMessages(messages);
  });
};

export {
  connectSocket,
  sendMessage,
  onReceiveMessage,
  disconnectSocket,
  getChatHistory,
};
