import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";

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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    preflightContinue: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  morgan((tokens, req, res) => {
    return chalk.blueBright(
      `[${tokens.method(req, res)}] ${tokens.url(req, res)} - ${tokens.status(
        req,
        res
      )} ${tokens["response-time"](req, res)}ms`
    );
  })
);

app.use("/api/v1/auth/users", signUpUser);
app.use("/api/v1/auth/users", signInUser);
app.use("/api/v1/auth/users", logOutUser);
app.use("/api/v1/users", getAllUsers);
app.use("/api/v1/users", getUserProfile);

const run = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 5000, () => {
      console.info(
        chalk.bgGreen.bgGreenBright.white.bold(
          `🚀 Server running on port ${process.env.PORT || 5000} 🚀`
        )
      );
    });
  } catch (error) {
    console.error(
      chalk.bgRed.bgRedBright.white.bold(
        `❌ Server failed to start: ${error.message} ❌`
      )
    );
    process.exit(1);
  }
};

run();
