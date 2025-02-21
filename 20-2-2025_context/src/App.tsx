import React, { useState } from "react";
import { TaskProvider, useTasks } from "./TaskContext";
import TaskList from "./TaskList";
import "./index.css";

const TaskInput: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter new task..."
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Task Manager</h1>
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;