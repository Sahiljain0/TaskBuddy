import { Request, Response } from 'express';
import Task from '../models/taskModel';
import User from '../models/userModel';
import { Schema } from 'mongoose';

// Get all tasks for a specific user
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a single task by ID for a specific user
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new task for a specific user
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const newTask = await Task.create({ ...req.body, userId: req.user.id });
        //@ts-ignore
        const user = await User.findById(req.user.id);
        //@ts-ignore
        user?.tasks.push(newTask._id);
        await user?.save(); // Save the user with the updated task ID
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update an existing task for a specific user
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            //@ts-ignore
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a task for a specific user
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const user = await User.findById(req.user.id);
        //@ts-ignore
        user?.tasks.filter(id => id !== req.params.id);
        await user?.save();
        //@ts-ignore
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Change the task status
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            //@ts-ignore
            { _id: req.params.id, userId: req.user.id },
            { status: req.body.status },
            { new: true }
        );
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};