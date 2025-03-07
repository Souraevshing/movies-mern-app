import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";

export const logOutUser = asyncHandler(async (_req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
