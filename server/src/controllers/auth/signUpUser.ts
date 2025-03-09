import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { signUpUserService } from "../../services/auth/signUpUserService.js";

/**
 * @swagger
 * /auth/users/signup:
 *   post:
 *     summary: Sign Up
 *     description: Registers a new user and returns the user data.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *       201:
 *         description: User successfully registered
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
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 type:
 *                   type: string
 *                   example: "USER"
 *       400:
 *         description: Bad request (e.g., missing fields)
 *       409:
 *         description: Conflict - Email already exists
 *       500:
 *         description: Internal server error
 */
export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await signUpUserService(username, email, password, res);

    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
