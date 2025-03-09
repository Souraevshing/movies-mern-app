import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { getAllUsersService } from "../../services/users/getAllUsersService.js";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all registered users.
 *     tags: [Users]
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65f3a7b1a9123c4567e89d12"
 *                   username:
 *                     type: string
 *                     example: "testUser"
 *                   email:
 *                     type: string
 *                     example: "test@example.com"
 *                   type:
 *                     type: string
 *                     example: "USER"
 *       500:
 *         description: Internal server error
 */
export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    try {
      const users = await getAllUsersService();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
      throw new Error(error.message);
    }
  }
);
