import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["manager", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
