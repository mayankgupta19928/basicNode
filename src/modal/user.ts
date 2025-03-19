import mongoose, { Document, Model, Schema } from "mongoose";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}
interface UserResponse {
  first_name: string;
  last_name: string;
  email: string;
}
interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModal: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export { UserModal, User, UserDocument, UserResponse };
