import User from "../models/user.model.js";
import Task from "../models/task.model.js";

// POST /api/users
export async function createUser(req, res, next) {
  try {
    const { name, role } = req.body; // role optional (manager sẽ tạo qua Compass)
    const user = await User.create({ name, role });
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

// GET /api/users
export async function getUsers(req, res, next) {
  try {
    const { name, role } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, "i"); // search gần đúng
    if (role) filter.role = role;
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json({ data: users });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/:id/tasks
export async function getUserTasks(req, res, next) {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ assignee: id, isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({ data: tasks });
  } catch (err) {
    next(err);
  }
}
