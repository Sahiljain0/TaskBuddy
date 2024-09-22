import { Schema, model } from 'mongoose';

// Define the user interface
interface IUser {
    name: string;
    email: string;
    password: string;
    tasks: Schema.Types.ObjectId[];
}

// Define the user schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [Schema.Types.ObjectId],
});


const User = model<IUser>('User', userSchema);

export default User;