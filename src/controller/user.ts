import { Request, Response } from "express";
import { User, UserDocument, UserModal } from "../modal/user";
import mongoose from "mongoose";

export async function handlerGetUser(req: Request, res: Response) {
  try {
    console.log("Get user mayank", process.pid);
    const allUsers: UserDocument[] = await UserModal.find({});
    const html = `<html>
          <head>
            <title>Users</title>
          </head>
          <body>
            <h1>Users</h1>
            <ul>
              ${allUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
            </ul>
          </body>
        </html>`;
    res.send(html);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function handleApiUserGet(req: Request, res: Response) {
  try {
    const allUsers: UserDocument[] = await UserModal.find({});
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleApiUserPost(req: Request, res: Response) {
  try {
    const body: User = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender) {
      res.status(400).send("All fields are required");
    }
    const result: UserDocument = await UserModal.create(body);
    console.log(result);
    res.status(200).send("Done");
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send(error.message);
    }
    res.status(500).send("Internal Server Error");
  }
}

export async function handleApiUserIdGet(req: Request, res: Response) {
  try {
    const parm: string = req.params.id;
    const user: UserDocument | null = await UserModal.findById(parm);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleApiUserIdPatch(req: Request, res: Response) {
  try {
    const parm: string = req.params.id;
    const updatedUser: UserDocument | null = await UserModal.findByIdAndUpdate(
      parm,
      { last_name: "Kumar" },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleApiUserIdDelete(req: Request, res: Response) {
  try {
    const parm: string = req.params.id;
    const deletedUser: UserDocument | null = await UserModal.findByIdAndDelete(
      parm
    );
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
