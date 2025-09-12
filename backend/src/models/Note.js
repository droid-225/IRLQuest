import mongoose from "mongoose";
// for models, we capitalize the first letter of the file name and keep the name as a singular noun

// Step 1: Create Schema
// Step 2: Create a model based on that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },    
    },
    {timestamps: true} // createdAt, updatedAt automatically provided by mongoose
);

const Note = mongoose.model("Note", noteSchema);

export default Note;