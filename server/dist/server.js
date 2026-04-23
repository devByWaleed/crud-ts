// Import
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/mongodb.js";
// Configuration
const app = express();
// Connect Database
connectDB();
// Configuration
app.use(express.json());
app.use(cors());
// API endpoints
app.get('/', (req, res) => res.send("API Working!!!"));
app.use('/api/user', userRouter);
// Running the server
app.listen(4000, () => {
    console.log("Server is running on port 4000!");
});
//# sourceMappingURL=server.js.map