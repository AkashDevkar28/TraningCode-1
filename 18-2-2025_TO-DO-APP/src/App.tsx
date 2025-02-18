import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Edit, Trash2, Check } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  text: string;
}

function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    alert("Task is deleted!!");
  };

  const startEditing = (id: number, text: string) => {
    setEditing(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditing(null);
    setEditText("");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Todo App</h2>
      <div className="d-flex gap-2 mb-3">
        <Form.Control
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        />
        <Button onClick={addTask} variant="primary">Add</Button>
      </div>
      <div className="d-flex flex-column gap-2">
        {tasks.map(({ id, text }) => (
          <Card key={id} className="p-3 d-flex flex-row justify-content-between align-items-center">
            {editing === id ? (
              <Form.Control
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{text}</span>
            )}
            <div className="d-flex gap-2">
              {editing === id ? (
                <Button variant="success" size="sm" onClick={() => saveEdit(id)}>
                  <Check size={16} />
                </Button>
              ) : (
                <Button variant="warning" size="sm" onClick={() => startEditing(id, text)}>
                  <Edit size={16} />
                </Button>
              )}
              <Button variant="danger" size="sm" onClick={() => deleteTask(id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <TodoApp />
    </div>
  );
}
