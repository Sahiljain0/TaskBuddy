import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

// Sign Up Controller
export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Sign In Controller
export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Find user by name
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        // Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: '30d' });

        // Set token in cookie
        res.cookie('token', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), sameSite: 'none', path: '/', secure: true }).status(200).json({ message: 'Logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};