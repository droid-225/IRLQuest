import Task from "../models/Task.js";

export async function getAllTasks(_, res) { // unused params are usually replaced with '_'
    //res.status(200).send("You just fetched the tasks!");

    try {
        const tasks = await Task.find().sort({createdAt: -1}); // -1 means newest first, 1 means oldest first
        res.status(200).json(tasks);
    } catch(error) {
        console.error("Error in getAllTasks controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({message: "Task not found!"});

        res.status(200).json(task);
    } catch(error) {
        console.error("Error in getTaskById controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createTask(req, res) {
    // res.status(201).json({message:"task created successfully!"});

    try {
        const {title, content, difficulty, rewardXp, complete} = req.body;
        const newTask = new Task({title, content, difficulty, rewardXp, complete});

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch(error) {
        console.error("Error in createTask controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateTask(req, res) {
    try {
        const {title, content, difficulty, rewardXp, complete} = req.body;
        
        // Create update object with only provided fields
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (difficulty !== undefined) updateData.difficulty = difficulty;
        if (rewardXp !== undefined) updateData.rewardXp = rewardXp;
        if (complete !== undefined) updateData.complete = complete;
        
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if(!updatedTask) return res.status(404).json({message: "Task not found"});

        res.status(200).json(updatedTask);
    } catch(error) {
        console.error("Error in updateTask controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if(!deletedTask) return res.status(404).json({message: "Task not found"});

        res.status(200).json({message: "Task deleted successfully!"});
    } catch(error) {
        console.error("Error in deleteTask controller:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
