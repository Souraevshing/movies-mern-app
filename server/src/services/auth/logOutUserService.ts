import { Response } from "express";

import { ResponseDto } from "../../dto/response.dto.js";

/**
 * Logs out the user by clearing the JWT cookie
 * @param {Response} res - Express response object
 */
export const logOutUserService = async (
  res: Response
): Promise<ResponseDto> => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  return { message: "Logged out successfully" };
};
