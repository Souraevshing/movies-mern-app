import bcrypt from "bcryptjs";
import { Response } from "express";

import User from "../../models/User.js";
import generateToken from "../../utils/generate-token.js";

/**
 * Handles user sign-in logic
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Response} res - Express response object (for setting cookies)
 * @returns {Promise<Object>} - User object if authenticated successfully
 */
export const signInUserService = async (
  email: string,
  password: string,
  res: Response
) => {
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  generateToken(res, existingUser._id);

  return {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    type: existingUser.type,
  };
};
