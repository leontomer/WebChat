import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import Message from "./models/Message";

const socketSetup = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", async (roomId) => {
      socket.join(roomId);
      const messages = await Message.find({ chatId: roomId }).sort({
        timestamp: 1,
      });
      socket.emit("chatHistory", messages);
    });

    socket.on("sendMessage", async ({ roomId, message, sender, recipient }) => {
      const ts = new Date();
      const newMessage = new Message({
        chatId: roomId,
        sender: sender,
        recipient: recipient,
        message: message,
        timestamp: ts,
      });
      await newMessage.save();
      socket.to(roomId).emit("receiveMessage", {
        chatId: roomId,
        sender,
        recipient,
        message,
        timestamp: ts,
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default socketSetup;
