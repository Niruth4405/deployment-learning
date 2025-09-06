const express = require("express");
const {
  CreateNote,
  deleteNote,
  getAllNotes,
  getAllNotesById,
  updateNote,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", getAllNotes);
router.get('/:id',getAllNotesById);
router.post("/", CreateNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
