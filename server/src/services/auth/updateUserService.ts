import bcrypt from "bcryptjs";
import { Response } from "express";

import User from "../../models/User.js";

/**
 * Updates the authenticated user's profile.
 * @param {string} userId - ID of the user to update
 * @param {string} [username] - New username (optional)
 * @param {string} [email] - New email (optional)
 * @param {string} [password] - New password (optional)
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUserService = async (
  userId: string,
  username?: string,
  email?: string,
  password?: string,
  res?: Response
) => {
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.username = username || user.username;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await user.save();

  return {
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    type: updatedUser.type,
    message: "Profile updated successfully",
  };
};
