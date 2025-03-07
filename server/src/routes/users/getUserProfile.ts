import express from "express";

import { updateUser } from "../../controllers/auth/updateUser.js";
import { getUserProfile } from "../../controllers/users/getUserProfile.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/profile/:id")
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUser);

export default router;
