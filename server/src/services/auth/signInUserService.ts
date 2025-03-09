import bcrypt from "bcryptjs";
import { Response } from "express";

import { ResponseDto } from "../../dto/response.dto.js";
import { UserDto } from "../../dto/user.dto.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generate-token.js";

/**
 * Handles user sign-in logic
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Response} res - Express response object (for setting cookies)
 * @returns {Promise<UserDto>} - User DTO if authenticated successfully
 * @throws {Error} If authentication fails
 */
export const signInUserService = async (
  email: string,
  password: string,
  res: Response
): Promise<UserDto | ResponseDto> => {
  if (!email || !password) {
    return { message: "All fields are required" };
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return { message: "User not found" };
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    return { message: "Invalid password" };
  }

  generateToken(res, existingUser._id);

  return {
    _id: existingUser._id.toString(),
    username: existingUser.username,
    email: existingUser.email,
    type: existingUser.type,
  };
};
