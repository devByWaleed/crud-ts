import express, { Router } from "express";
// Keep the .js extension for compatibility with your "type": "module" setup
import { createUser, deleteUser, getUser, getUserByID, updateUser } from "../controllers/userController.js";
// Annotate the router as an Express Router type
const userRouter = express.Router();
// Public routes
userRouter.post('/create-user', createUser);
userRouter.get('/get-user', getUser);
userRouter.get('/data/:id', getUserByID);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);
export default userRouter;
//# sourceMappingURL=userRoutes.js.map