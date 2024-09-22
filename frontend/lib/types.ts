// Interface representing a logged-in user
export interface LoggedInUser {
    id: string;
    name: string;
    email: string;
};

// Interface representing the authentication state
export interface AuthState {
    user: LoggedInUser | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    signup: (credentials: { name: string; email: string; password: string }) => Promise<void>;
}

// Interface representing a task
export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
}

// Interface representing the task store state and actions
export interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, '_id'>) => Promise<void>;
    updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
    changeTaskStatus: (id: string, status: Task['status']) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

// Interface representing an axios error
export interface axiosError {
    message: string;
}

// Type representing a column with tasks
export type ColumnType = {
    id: string;
    list: Task[];
}
