import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { getUserProfileService } from "../../services/users/getUserProfileService.js";

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
      const user = await getUserProfileService(req.user._id);

      if (user) {
        res.status(200).json(user);
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
