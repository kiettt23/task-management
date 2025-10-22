import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserTasks,
} from "../controllers/user.controller.js";
import {
  createUserValidator,
  idParamValidator,
  validate,
} from "../middlewares/validators.js";

const router = Router();

/**
 * @route POST /api/users
 * @desc  Create a new user (default role: employee)
 * @access private (giả định)
 */
router.post("/", createUserValidator, validate, createUser);

/**
 * @route GET /api/users
 * @desc  Get users with optional filters (?name=&role=)
 */
router.get("/", getUsers);

/**
 * @route GET /api/users/:id/tasks
 * @desc  Get all tasks of one user
 */
router.get("/:id/tasks", idParamValidator, validate, getUserTasks);

export default router;
