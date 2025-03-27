import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks"; // Backend URL

function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend on page load
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // ✅ Add a new task
  const addTask = (text) => {
    axios.post(API_URL, { text })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error("Error adding task:", err));
  };

  // ✅ Update a task
  const updateTask = (id, newText) => {
    axios.put(`${API_URL}/${id}`, { text: newText })
      .then((res) => {
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // ✅ Delete a task
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
