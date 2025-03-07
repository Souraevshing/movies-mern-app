import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/User.js";

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
}

export const getUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
