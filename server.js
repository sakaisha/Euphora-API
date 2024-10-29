import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";  // Import routes file

dotenv.config();  // Load environment variables from .env file

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));  // Log requests for debugging
app.use(express.json());  // Parse incoming JSON payloads

// Use the routes from routes.js with the base path `/euphora/api/v1`
app.use('/euphora/api/v1', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Euphora-API is running on port ${PORT}`);
});