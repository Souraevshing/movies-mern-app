import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB_URL, { autoIndex: true })
      .then(() => {
        console.info(
          chalk.bgGreen.bgGreenBright.black.bold(`✅ Connected to MongoDB ✅`)
        );
      });
  } catch (error) {
    console.error(
      chalk.bgRed.bgRedBright.black.bold(
        `❌ MongoDB Connection Error: ${error.message} ❌`
      )
    );
    throw new Error(error);
  }
};

export default connectDB;
