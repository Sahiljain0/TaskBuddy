import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // This should load your .env file


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "", {
            dbName: "task-manager",
        }
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};