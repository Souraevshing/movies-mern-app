import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { signUpUserService } from "../../services/auth/signUpUserService.js";

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await signUpUserService(username, email, password, res);

    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
