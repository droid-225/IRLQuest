import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config(); // lets us use the values in the .env file

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin:"http://localhost:5173",
    }));
}
app.use(express.json()); // parses the JSON bodies, allows access to req.body
app.use(rateLimiter);

// example custom middleware:
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}\nRequest URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => { // only starts listening to the port after the db is connected
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});