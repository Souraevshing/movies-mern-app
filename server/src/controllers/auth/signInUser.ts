import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { signInUserService } from "../../services/auth/signInUserService.js";

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await signInUserService(email, password, res);

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
