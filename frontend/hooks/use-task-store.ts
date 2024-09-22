import { useEffect } from 'react';
import { create } from 'zustand';
import axios from 'axios';
import { TaskStore } from '@/lib/types';
import { useAuthStore } from './use-auth-store';

// Base URL for the API endpoints
const BASE_URL = "http://localhost:5000/api/v1/";
// const BASE_URL = "https://tasker-next-app.onrender.com/api/v1/";

// Create a Zustand store for task management
export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [], // Initial state for tasks
    isLoading: false, // Initial loading state
    error: null, // Initial error state

    // Fetch tasks from the API
    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(BASE_URL + 'tasks', { withCredentials: true });
            set({ tasks: response.data, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    // Add a new task to the API
    addTask: async (task) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(BASE_URL + 'tasks', task, { withCredentials: true });
            set((state) => ({
                tasks: [...state.tasks, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    // Update an existing task in the API
    updateTask: async (id, updatedTask) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(BASE_URL + `tasks/${id}`, updatedTask, { withCredentials: true });
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? response.data : task
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    // Delete a task from the API
    deleteTask: async (id) => {
        set({ isLoading: true });
        try {
            await axios.delete(BASE_URL + `tasks/${id}`, { withCredentials: true });
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    // Change the status of a task in the API
    changeTaskStatus: async (id, status) => {
        set({ isLoading: true });
        try {
            const response = await axios.patch(BASE_URL + `tasks/${id}`, { status }, { withCredentials: true });
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? response.data : task
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    }
}));

// Component to handle authentication state changes
const TaskStoreInitializer = () => {
    const { user } = useAuthStore(); // Get the current user from the auth store
    const fetchTasks = useTaskStore((state) => state.fetchTasks);

    useEffect(() => {
        if (user) {
            fetchTasks(); // Fetch tasks when the user is authenticated
        }
    }, [user, fetchTasks]);

    return null;
};

export default TaskStoreInitializer;
