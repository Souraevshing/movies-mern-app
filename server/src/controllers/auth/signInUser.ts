import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { signInUserService } from "../../services/auth/signInUserService.js";

/**
 * @swagger
 * /auth/users/signin:
 *   post:
 *     summary: Sign In
 *     description: Authenticates a user with email and password, then returns user data along with a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Successfully authenticated
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
 *                   example: "user@example.com"
 *                 type:
 *                   type: string
 *                   example: "USER"
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 *     headers:
 *        Set-Cookie:
 *          description: JWT token is set as an HTTP-only cookie.
            schema:
                type: string
                example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *        
 */
export const signInUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await signInUserService(email, password, res);

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
