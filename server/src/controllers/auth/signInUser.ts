import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generate-token.js";

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, existingUser._id);

    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        type: existingUser.type,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
