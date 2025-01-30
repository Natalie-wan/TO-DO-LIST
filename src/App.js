import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import CategoryFilter from './Components/CategoryFilter';
//import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  //Fetch tasks from json-server on mount
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  //Add new task handler
  const handleAddTask = (newTask) => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((createdTask) => setTasks((prevTasks) => [ ...prevTasks, createdTask]))
    .catch((error) => console.error("Error:", error));
  };
  return (
    <div>
      <Router>
        <NavBar />
        <h1 style={{textAlign: "center" }}>To-Do List</h1>
        <Routes>
          <Route path="/tasks" element={<TaskList tasks={tasks} />} />
          <Route path="/add-task" element={<TaskForm onAddTask={handleAddTask} />} />
          <Route path="/categories" element={<CategoryFilter />} />
          <Route path="/" element={<TaskList tasks={tasks} />} /> {/* Default Route */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;