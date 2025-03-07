import express from "express";

import { getAllUsers } from "../../controllers/users/getAllUsers.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(isAuthenticated, isAdmin, getAllUsers);

export default router;
