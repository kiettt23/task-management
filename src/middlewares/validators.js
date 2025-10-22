import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

// Helper: kiểm tra ObjectId hợp lệ
const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// USER validators
export const createUserValidator = [
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("name cannot be empty"),
];

// TASK validators
export const createTaskValidator = [
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .trim()
    .notEmpty(),
  body("description")
    .exists()
    .withMessage("description is required")
    .bail()
    .isString()
    .trim()
    .notEmpty(),
  body("status")
    .optional()
    .isIn(["pending", "working", "review", "done", "archive"]),
];

export const idParamValidator = [
  param("id").custom(isObjectId).withMessage("Invalid Mongo ObjectId"),
];

export const assignValidator = [
  body("userId").custom(isObjectId).withMessage("Invalid userId"),
];

export const updateStatusValidator = [
  body("status").isIn(["pending", "working", "review", "done", "archive"]),
];

// Kết thúc chuỗi validator: gom lỗi trả về
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
