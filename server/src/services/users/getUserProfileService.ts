import User from "../../models/User.js";

/**
 * Fetch user profile by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise<any | null>} - User profile (excluding password) or null if not found
 */
export const getUserProfileService = async (
  userId: string
): Promise<any | null> => {
  const user = await User.findById(userId).select("_id username email");
  return { user };
};
