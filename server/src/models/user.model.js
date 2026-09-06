import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists."],
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      unique: [true, "Email is already associated with an existing user."],
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
