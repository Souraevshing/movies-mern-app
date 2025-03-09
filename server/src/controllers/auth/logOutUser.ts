import { Request, Response } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";
import { logOutUserService } from "../../services/auth/logOutUserService.js";

/**
 * @swagger
 * /auth/users/logout:
 *   post:
 *     summary: Logs Out
 *     description: Clears the authentication cookie, logging the user out.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       500:
 *         description: Internal server error
 */
export const logOutUser = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const response = logOutUserService(res);
    return res.status(200).json(await response);
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw new Error(err.message);
  }
});
