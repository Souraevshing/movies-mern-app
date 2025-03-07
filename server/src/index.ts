import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import express from "express";

import connectDB from "./config/connect.js";
import logOutUser from "./routes/auth/logOutUser.js";
import signInUser from "./routes/auth/signInUser.js";
import signUpUser from "./routes/auth/signUpUser.js";
import getAllUsers from "./routes/users/getAllUsers.js";
import getUserProfile from "./routes/users/getUserProfile.js";

const app = express();

configDotenv();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth/users", signUpUser);
app.use("/api/v1/auth/users", signInUser);
app.use("/api/v1/auth/users", logOutUser);
app.use("/api/v1/users", getAllUsers);
app.use("/api/v1/users", getUserProfile);

app.listen(process.env.PORT || 5000, () => {
  console.info(`Server running on port ${process.env.PORT || 5000}`);
  connectDB();
});
