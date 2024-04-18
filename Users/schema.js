import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    following: { type: Array, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { collection: "users" }
);
export default userSchema;
