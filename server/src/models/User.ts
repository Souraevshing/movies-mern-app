import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      default: "ADMIN",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
