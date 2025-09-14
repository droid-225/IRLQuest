import express from "express";
const router = express.Router();
import {getAllTasks, deleteTask, updateTask, createTask, getTaskById} from "../controllers/tasksController.js"

// Endpoint
// A commbination of a URL + HTTP method that lets the client interact with a specific resource.
// All of these method responses are endpoints
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;