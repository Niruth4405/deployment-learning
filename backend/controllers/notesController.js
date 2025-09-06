const Note = require("../models/notesModel.js");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllNotesById = async(req,res)=>{ 
try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message:"Note not found!"})
        res.json(note);
} catch (error) {
    console.error("Error in controller", error);
    res.status(500).json({ message: error.message });
}
}

const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Note.findOneAndUpdate({ _id: req.params.id }, { title, content });
    res.status(201).json({ message: "Notes updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(201).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotes,
  getAllNotesById,
  CreateNote,
  updateNote,
  deleteNote,
};
