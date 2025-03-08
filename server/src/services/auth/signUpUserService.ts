import bcrypt from "bcryptjs";
import { Response } from "express";

import User from "../../models/User.js";
import generateToken from "../../utils/generate-token.js";

/**
 * Handles user sign-up logic
 * @param {string} username - User's username
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Response} res - Express response object (for setting cookies)
 * @returns {Promise<Object>} - Created user object
 */
export const signUpUserService = async (
  username: string,
  email: string,
  password: string,
  res: Response
) => {
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email }).select(
    "id username email type"
  );
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  generateToken(res, newUser._id);

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    type: newUser.type,
  };
};
