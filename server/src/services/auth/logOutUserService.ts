import { Response } from "express";

/**
 * Logs out the user by clearing the JWT cookie
 * @param {Response} res - Express response object
 */
export const logOutUserService = (res: Response): Response => {
  return res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
};
