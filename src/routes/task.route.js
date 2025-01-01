import { 
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask 
} from "../Controller/task.controller.js";
import { Router } from "express";
// You can also import the { authMiddleware } to authenticate the user.

const router = Router();

// Create a new task
router.route("/tasks").post(createTask);

// Delete an existing task
router.route("/tasks/:id").delete(deleteTask);

// Get all tasks
router.route("/tasks").get(getAllTasks);

// Get a single task by ID
router.route("/tasks/:id").get(getTask);

// Update an existing task
router.route("/tasks/:id").put(updateTask);


export default router;
