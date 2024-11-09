import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import searchRoute from "./routes/search";
import chatRoute from "./routes/chat";
import connectDB from "./db";
import socketSetup from "./sokcet";
import { createServer } from "http";

const app: Application = express();
connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req: any, res: any) => res.send("Server is running"));

app.use("/auth", authRoutes);

app.use(searchRoute);
app.use(chatRoute);

const PORT = process.env.PORT || 5000;
const server = createServer(app);
socketSetup(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
