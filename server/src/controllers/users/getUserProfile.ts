import { Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { getUserProfileService } from "../../services/users/getUserProfileService.js";

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
    type: string;
  };
}

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieves profile details of a user by ID. Only accessible to authenticated users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to fetch the profile
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65f3a7b1a9123c4567e89d12"
 *                 username:
 *                   type: string
 *                   example: "testUser"
 *                 email:
 *                   type: string
 *                   example: "test@example.com"
 *                 type:
 *                   type: string
 *                   example: "USER"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const getUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await getUserProfileService(req.user._id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
