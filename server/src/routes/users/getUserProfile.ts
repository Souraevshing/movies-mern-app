import express from "express";

import { getUserProfile } from "../../controllers/users/getUserProfile.js";
import { updateUser } from "../../controllers/users/updateUser.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/profile/:id")
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUser);

export default router;
