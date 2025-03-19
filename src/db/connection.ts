import mongoose from "mongoose";

const connectmongoDb = async (): Promise<void> => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/Firstdb")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err: any) => {
      console.log("Error connecting to MongoDB", err);
    });
};

export { connectmongoDb };
