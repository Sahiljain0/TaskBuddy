import { Schema, model } from 'mongoose';

// Define the task interface
interface ITask {
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    userId: Schema.Types.ObjectId;
    dueDate?: Date;
}

// Define the task schema
const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date }
});


const Task = model<ITask>('Task', taskSchema);

export default Task;