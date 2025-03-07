import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/User.js";

export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
      throw new Error(error.message);
    }
  }
);
