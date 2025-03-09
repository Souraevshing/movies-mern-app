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

UserSchema.index({ email: 1, type: 1 });

export default mongoose.model("User", UserSchema);
