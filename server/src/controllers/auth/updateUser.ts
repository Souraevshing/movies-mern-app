import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/User.js";

// Extend Request to include authenticated user data
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
  body: {
    username?: string;
    email?: string;
    password?: string;
  };
}

export const updateUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        type: updatedUser.type,
        message: "Profile updated successfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw new Error(err.message);
    }
  }
);
