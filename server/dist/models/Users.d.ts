import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}
declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default UserModel;
//# sourceMappingURL=Users.d.ts.map