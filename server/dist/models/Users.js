// Importing
import mongoose, { Schema, Document } from "mongoose";
// Create Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
});
// Export the model
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
/*
npm install typescript ts-node @types/express @types/mongoose @types/node @types/cors --save-dev
*/ 
//# sourceMappingURL=Users.js.map