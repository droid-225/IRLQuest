import Note from "../models/Note.js";

export async function getAllNotes(_, res) { // unused params are usually replaced with '_'
    //res.status(200).send("You just fetched the notes!");

    try {
        const notes = await Note.find().sort({createdAt: -1}); // -1 means newest first, 1 means oldest first
        res.status(200).json(notes);
    } catch(error) {
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if(!note) return res.status(404).json({message: "Note not found!"});

        res.status(200).json(note);
    } catch(error) {
        console.error("Error in getNoteById controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote(req, res) {
    // res.status(201).json({message:"note created successfully!"});

    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNode = await newNote.save();
        res.status(201).json(savedNode);
    } catch(error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title: title, content: content}, {new: true,});

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updatedNote);
    } catch(error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote(req, res) {
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message: "Node not found"});

        res.status(200).json({message: "Note deleted successfully!"});
    } catch(error) {
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
