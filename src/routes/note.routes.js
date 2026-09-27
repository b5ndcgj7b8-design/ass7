import express from "express";
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllNotes,
  deleteNote,
  paginateSort,
  getNote,
  getByContent,
  getNotesWithUser,
  aggregateNotes,
  deleteAllNotes
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.put("/replace/:noteId", replaceNote);
router.patch("/all", updateAllNotes);
router.delete("/:noteId", deleteNote);
router.get("/paginate-sort", paginateSort);
router.get("/note-by-content", getByContent);
router.get("/note-with-user", getNotesWithUser);
router.get("/aggregate", aggregateNotes);
router.delete("/", deleteAllNotes);
router.get("/:id", getNote);

export default router;
