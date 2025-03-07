import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB_URL, { autoIndex: true })
      .then(() => {
        console.info(`Connected to MongoDB`);
      });
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
