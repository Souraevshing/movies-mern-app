import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Document, Types } from "mongoose";

import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

// Extend Express Request to include user property
interface AuthenticatedRequest extends Request {
  user?: Document & {
    _id: Types.ObjectId;
    username: string;
    type: string;
    email: string;
  };
}

export const isAuthenticated = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access, no token" });
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
      };

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
);

export const isAdmin = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.type !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden, user is not an admin" });
    }

    next();
  }
);
