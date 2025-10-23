import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  assignTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";
import {
  createTaskValidator,
  idParamValidator,
  assignValidator,
  updateStatusValidator,
  validate,
} from "../middlewares/validators.js";

const router = Router();

/**
 * @route POST /api/tasks
 * @desc  Create a new task
 */
router.post("/", createTaskValidator, validate, createTask);

/**
 * @route GET /api/tasks
 * @desc  Get all tasks (filterable)
 */
router.get("/", getTasks);

/**
 * @route GET /api/tasks/:id
 * @desc  Get one task by id
 */
router.get("/:id", idParamValidator, validate, getTaskById);

/**
 * @route PATCH /api/tasks/:id/assign
 * @desc  Assign or unassign a task
 */
router.patch(
  "/:id/assign",
  idParamValidator,
  assignValidator,
  validate,
  assignTask
);

/**
 * @route PATCH /api/tasks/:id/status
 * @desc  Update task status (done → only archive)
 */
router.patch(
  "/:id/status",
  idParamValidator,
  updateStatusValidator,
  validate,
  updateTaskStatus
);

/**
 * @route DELETE /api/tasks/:id
 * @desc  Soft delete a task
 */
router.delete("/:id", idParamValidator, validate, deleteTask);

export default router;
