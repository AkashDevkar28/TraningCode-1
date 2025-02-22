import React, { useMemo } from "react";
import { useTasks } from "./TaskContext";

const TaskList: React.FC = () => {
    const { tasks, toggleTask, removeTask } = useTasks();
    const completedCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

    return (
        <div className="task-container">
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                        <button onClick={() => removeTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
            <p>Completed Tasks: {completedCount}</p>
        </div>
    );
};

export default TaskList;