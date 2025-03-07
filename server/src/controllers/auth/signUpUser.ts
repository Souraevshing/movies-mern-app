import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generate-token.js";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const existingUser = await User.findOne({ email }).select(
      "id username email type"
    );
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    generateToken(res, newUser._id);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        type: newUser.type,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
