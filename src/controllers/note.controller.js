import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
      new: true,
      runValidators: true
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const replaceNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndReplace(req.params.noteId, req.body, {
      new: true,
      runValidators: true
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAllNotes = async (req, res) => {
  try {
    const result = await Note.updateMany({}, req.body, {
      runValidators: true
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const paginateSort = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getByContent = async (req, res) => {
  try {
    const notes = await Note.find({ content: req.query.content });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotesWithUser = async (req, res) => {
  try {
    const notes = await Note.find().populate("userId");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aggregateNotes = async (req, res) => {
  try {
    const notes = await Note.aggregate([
      { $match: { title: req.query.title } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllNotes = async (req, res) => {
  try {
    const result = await Note.deleteMany({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
