import express from "express";

import { signInUser } from "../../controllers/auth/signInUser.js";

const router = express.Router();

router.route("/signin").post(signInUser);

export default router;
