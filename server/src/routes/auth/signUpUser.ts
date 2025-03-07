import express from "express";

import { signUpUser } from "../../controllers/auth/signUpUser.js";

const router = express.Router();

router.route("/signup").post(signUpUser);

export default router;
