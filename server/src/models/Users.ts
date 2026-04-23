// Importing
import mongoose, { Schema, Document } from "mongoose";


// Define the interface
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}


// Create Schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
});


// Export the model
const UserModel = mongoose.model<IUser>("users", UserSchema);
export default UserModel;

/*
npm install typescript ts-node @types/express @types/mongoose @types/node @types/cors --save-dev
*/