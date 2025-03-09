import bcrypt from "bcryptjs";

import { ResponseDto } from "../../dto/response.dto.js";
import { UserDto } from "../../dto/user.dto.js";
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
  password?: string
): Promise<UserDto | ResponseDto> => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      message: "User not found",
    };
  }

  if (email && email !== user.email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return { message: "Email already in use" };
    }
    user.email = email;
  }

  user.username = username || user.username;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await user.save();

  return {
    _id: updatedUser._id.toString(),
    username: updatedUser.username,
    email: updatedUser.email,
    type: updatedUser.type,
  };
};
