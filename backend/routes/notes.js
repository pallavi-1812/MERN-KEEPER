import express from 'express';
import auth from '../middleware/auth.js';
import { createNote, getNotes, deleteNote } from '../controllers/notes.js';

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.delete("/:id", auth, deleteNote);

export default router;