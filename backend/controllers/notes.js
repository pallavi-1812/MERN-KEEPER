import Note from '../models/Note.js';

export const createNote = (req, res) => {
    try {
        const { title, content } = req.body;
        //validation
        if (!title) {
            return res.status(400).json({ msg: "Please enter the title field." });
        };
        const newNote = new Note({
            title,
            content,
            userId: req.user
        });
        newNote.save()
            .then(note => res.json(note));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user });
    res.json(notes);
}

export const deleteNote = async (req, res) => {
    const note = await Note.findOne({ userId: req.user, _id: req.params.id });
    if (!note) {
        return res.status(400).json({ msg: "No note with current user's id found." });
    }
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.json(deletedNote);
}