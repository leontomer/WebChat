import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  chatId: string;
  sender: string;
  recipient: string;
  message: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: String, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
