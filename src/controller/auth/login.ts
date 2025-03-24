import { Request, Response } from "express";
import { UserDocument, UserModal } from "../../modal/user";
import { uid } from "uid";
import { setSessionId } from "../../service/auth";
export async function handleApiLoginPost(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;

    console.log("email", "password", req.body, email, password);

    const user: UserDocument | null = await UserModal.findOne({
      email,
      password,
    });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    // Generate a unique token for the user
    const token = uid(32); // Generate a random token (you can use a library like uuid or crypto for better randomness)
    // Store the token in the user's session or database
    // For this example, we'll just send it back in the response
    res.cookie("token", token, { httpOnly: true });
    setSessionId(token, user);

    res.status(200).json({ message: "Login successful", ...user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const signUpHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModal.find({ email });
    // console.log("existingUser", existingUser, existingUser?.length);
    if (existingUser?.length > 0) {
      res
        .status(501)
        .json({ message: "User already exists", ...existingUser, ...req.body });
    }
    // res.status(201).json({
    //   message: "User created successfully",
    //   ...existingUser,
    //   ...req.body,
    // });

    // Create a new user
    else if (existingUser?.length === 0) {
      await UserModal.create({
        first_name,
        last_name,
        email,
        password,
      });
      // Hash the password before saving
      // newUser.password = await bcrypt.hash(password, 10);
      // await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal Server Error signuo" });
  }
};
