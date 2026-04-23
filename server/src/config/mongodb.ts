import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    // Standard event listener for connection
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    });

    // Handle potential errors after initial connection
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
    });

    const uri = "mongodb://localhost:27017";

    if (!uri) {
        console.error("MONGODB_URI is not defined in environment variables");
        process.exit(1); // Exit process if DB URI is missing
    }

    try {
        await mongoose.connect(`${uri}/crudTS`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default connectDB;