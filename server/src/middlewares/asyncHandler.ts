import { NextFunction, Request, Response } from "express";

const asyncHandler =
  (fn) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
  };

export default asyncHandler;
