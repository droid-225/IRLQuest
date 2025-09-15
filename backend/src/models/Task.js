import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        rewardXp: {
            type: Number,
            required: true
        },
        complete: {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true} // createdAt, updatedAt automatically provided by mongoose
);

const Task = mongoose.model("Task", taskSchema);

export default Task;