import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import searchRoute from "./routes/search";
import dotenv from "dotenv";
import connectDB from "./db";
import socketSetup from "./sokcet";
import { createServer } from "http";

dotenv.config();
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

const PORT = process.env.PORT || 5000;
const server = createServer(app);
socketSetup(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
