import Task from "../models/task.model.js";
import User from "../models/user.model.js";

// POST /api/tasks
export async function createTask(req, res, next) {
  try {
    const { name, description, status } = req.body;
    const task = await Task.create({ name, description, status });
    res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks (filter)
export async function getTasks(req, res, next) {
  try {
    const { name, status } = req.query;
    const filter = { isDeleted: false };

    if (name) filter.name = new RegExp(name, "i");
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate("assignee", "name role") // lấy info user được gán
      .sort({ createdAt: -1 });

    res.json({ data: tasks });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks/:id
export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("assignee", "name role");

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ data: task });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/tasks/:id/assign
export async function assignTask(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const task = await Task.findById(id);
    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Cho phép unassign (nếu userId = null)
    let assignee = null;
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      assignee = userId;
    }

    task.assignee = assignee;
    await task.save();

    res.json({ message: "Task assignment updated", data: task });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/tasks/:id/status
export async function updateTaskStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    // rule: nếu đã done → chỉ được đổi sang archive
    if (task.status === "done" && status !== "archive") {
      return res.status(400).json({
        message: "Task already done. You can only archive it.",
      });
    }

    task.status = status;
    await task.save();

    res.json({ message: "Task status updated", data: task });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/tasks/:id (soft delete)
export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isDeleted = true;
    await task.save();

    res.json({ message: "Task soft deleted" });
  } catch (err) {
    next(err);
  }
}
