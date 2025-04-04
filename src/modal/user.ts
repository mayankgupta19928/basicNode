import mongoose, { Document, Model, Schema } from "mongoose";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  password: string | null; // incrypt password store
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
    gender: { type: String },
    password: { type: String, required: true }, // incrypt password store
  },
  { timestamps: true }
);

const UserModal: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);
export { UserModal }; // If this is a component or a value

export type { User, UserDocument, UserResponse };
