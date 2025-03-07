import express from "express";

import { logOutUser } from "../../controllers/auth/logOutUser.js";

const router = express.Router();

router.route("/logout").post(logOutUser);

export default router;
