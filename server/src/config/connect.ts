import chalk from "chalk";
import mongoose from "mongoose";
import User from "../models/User.js";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB_URL, { autoIndex: true })
      .then(async () => {
        console.info(
          chalk.bgGreen.bgGreenBright.black.bold(`✅ Connected to MongoDB ✅`)
        );
        await User.syncIndexes();
        console.info(
          chalk.bgBlue.bgBlueBright.white.bold(
            "🔄 Indexes synced successfully 🔄"
          )
        );
      });
  } catch (error) {
    console.error(
      chalk.bgRed.bgRedBright.white.bold(
        `❌ MongoDB Connection Error: ${error.message} ❌`
      )
    );
    throw new Error(error);
  }
};

export default connectDB;
