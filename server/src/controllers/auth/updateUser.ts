import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { updateUserService } from "../../services/auth/updateUserService.js";

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
      const { username, email, password } = req.body;

      const updatedUser = await updateUserService(
        req.user._id,
        email,
        password
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw new Error(err.message);
    }
  }
);
