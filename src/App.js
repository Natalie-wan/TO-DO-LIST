import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import CategoryFilter from './Components/CategoryFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks

  // Fetch tasks from json-server on mount
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setFilteredTasks(data); // Initialize filteredTasks with all tasks
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add new task handler
  const handleAddTask = (newTask) => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((createdTask) => {
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        setFilteredTasks((prevTasks) => [...prevTasks, createdTask]); // Add new task to filteredTasks
      })
      .catch((error) => console.error("Error:", error));
  };

  // Extract unique categories from tasks
  const categories = [...new Set(tasks.map((task) => task.category))];

  // Handle category filter changes
  const handleFilter = (selectedCategory) => {
    if (selectedCategory === "All") {
      setFilteredTasks(tasks); // Show all tasks
    } else {
      const filtered = tasks.filter((task) => task.category === selectedCategory);
      setFilteredTasks(filtered); // Show tasks for the selected category
    }
  };

  return (
    <div>
      <Router>
        <NavBar />
        <h1 style={{ textAlign: "center" }}>To-Do List</h1>
        <Routes>
          <Route path="/tasks" element={<TaskList tasks={filteredTasks} />} />
          <Route path="/add-task" element={<TaskForm onAddTask={handleAddTask} />} />
          <Route
            path="/categories"
            element={
              <CategoryFilter
                categories={categories}
                onFilter={handleFilter}
              />
            }
          />
          <Route path="/" element={<TaskList tasks={filteredTasks} />} /> {/* Default Route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;