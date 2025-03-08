import User from "../../models/User.js";

/**
 * Fetch all users from the database excluding passwords.
 * @returns {Promise<any[]>} List of users
 */
export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return { users };
};
