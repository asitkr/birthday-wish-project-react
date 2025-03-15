import dotenv from "dotenv";
import connectDB from "./database/db.connect.js";
import app from './app.js';

// dotenv configure
dotenv.config();

// Database connection
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
