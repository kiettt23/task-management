import mongoose from "mongoose";

const STATUS = ["pending", "working", "review", "done", "archive"];

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: STATUS, default: "pending" },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index phổ biến cho filter
taskSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Task", taskSchema);
export { STATUS };
