"use client"
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { AuthState } from '@/lib/types';

// Base URL for the API endpoints
// const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = "https://taskbuddy-1.onrender.com/api/v1/";

// Create a Zustand store with persistence
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null, // Initial state for user
            isLoading: false, // Initial state for loading status
            error: null, // Initial state for error

            // Login function
            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(BASE_URL + 'login', credentials, { withCredentials: true });
                    set({ user: response.data, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },

            // Logout function
            logout: () => {
                set({ user: null });
            },

            // Signup function
            signup: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(BASE_URL + 'signup', credentials, { withCredentials: true });
                    set({ user: response.data, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },
        }),
        {
            name: 'authStore', // Name of the storage key
            storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
        }
    )
);
