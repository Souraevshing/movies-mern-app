import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { updateUserService } from "../../services/users/updateUserService.js";

// Extend Request to include authenticated user data
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
  body: {
    username?: string;
    email?: string;
    password?: string;
  };
}

/**
 * @swagger
 * /users/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile details of the authenticated user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update the profile of
 *         schema:
 *           type: string
 *           example: "65b8f4e8c1a9d90017056a7a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_username"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newemail@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "newPassword123!"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65b8f4e8c1a9d90017056a7a"
 *                 username:
 *                   type: string
 *                   example: "new_username"
 *                 email:
 *                   type: string
 *                   example: "newemail@example.com"
 *                 type:
 *                   type: string
 *                   example: "USER"
 *       400:
 *         description: Bad request (e.g., missing or invalid input fields)
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const updateUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const updatedUser = await updateUserService(
        req.user._id,
        username,
        email,
        password
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw new Error(err.message);
    }
  }
);
