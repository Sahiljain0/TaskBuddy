import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import {
    deleteUser,
    updateUser,
} from "../controllers/userController";
import {
    changeStatus,
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
} from "../controllers/taskController";
import { authenticateUser, authorizeUser } from "../middlewares/authMiddleware";

const router = Router();

// Auth routes
router.post("/signup", signUp);
router.post("/login", signIn);

// User routes
router.put("/users/:id", authenticateUser, authorizeUser, updateUser);
router.delete("/users/:id", authenticateUser, authorizeUser, deleteUser);

// Task routes
router.get("/tasks", authenticateUser, authorizeUser, getAllTasks);
router.get("/tasks/:id", authenticateUser, authorizeUser, getTaskById);
router.post("/tasks", authenticateUser, authorizeUser, createTask);
router.put("/tasks/:id", authenticateUser, authorizeUser, updateTask);
router.delete("/tasks/:id", authenticateUser, authorizeUser, deleteTask);
router.patch("/tasks/:id", authenticateUser, authorizeUser, changeStatus);

export default router;
