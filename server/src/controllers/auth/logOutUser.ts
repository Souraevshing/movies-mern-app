import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { logOutUserService } from "../../services/auth/logOutUserService.js";

export const logOutUser = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const response = logOutUserService(res);

    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
