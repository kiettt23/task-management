import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.api.js";
import taskRouter from "./routes/task.api.js";

const app = express();

// Middlewares nền tảng
app.use(cors());
app.use(express.json()); // parse JSON body
app.use(morgan("dev")); // log request

// Mount routers
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler chuẩn
app.use((err, _req, res, _next) => {
  console.error(err);
  const code = err.statusCode || 500;
  res.status(code).json({ message: err.message || "Internal Server Error" });
});

export default app;
