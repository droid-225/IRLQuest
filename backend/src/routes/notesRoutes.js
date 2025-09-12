import express from "express";
const router = express.Router();
import {getAllNotes, deleteNote, updateNote, createNote, getNoteById} from "../controllers/notesController.js"

// Endpoint
// A commbination of a URL + HTTP method that lets the client interact with a specific resource.
// All of these method responses are endpoints
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;