import React, { createContext, useReducer, useContext, useMemo, useCallback, ReactNode } from "react";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

type Action =
    | { type: "ADD_TASK"; payload: string }
    | { type: "REMOVE_TASK"; payload: number }
    | { type: "TOGGLE_TASK"; payload: number };

const initialState: Task[] = [];

const taskReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case "REMOVE_TASK":
            return state.filter(task => task.id !== action.payload);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        default:
            return state;
    }
};

const TaskContext = createContext<{
    tasks: Task[];
    addTask: (text: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
} | null>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    const addTask = useCallback((text: string) => dispatch({ type: "ADD_TASK", payload: text }), []);
    const removeTask = useCallback((id: number) => dispatch({ type: "REMOVE_TASK", payload: id }), []);
    const toggleTask = useCallback((id: number) => dispatch({ type: "TOGGLE_TASK", payload: id }), []);

    const value = useMemo(() => ({ tasks, addTask, removeTask, toggleTask }), [tasks]);

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};