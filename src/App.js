import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import TaskForm from './Components/TaskForm';
import CategoryFilter from './Components/CategoryFilter';
import DraggableTaskList from './Components/DragDropContainer'; // Import DraggableTaskList

function App() {
  const [tasks, setTasks] = useState([]); // State for all tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
  const [error, setError] = useState(null); // State for error handling

  // Fetch tasks from JSON server on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data); // Set all tasks
        setFilteredTasks(data); // Initialize filteredTasks with all tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []); // Only run once when the component mounts

  // Add new task handler
  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setFilteredTasks((prevTasks) => [...prevTasks, createdTask]); // Add new task to filteredTasks
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again later.");
    }
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
        
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>} {/* Display error message */}

        <Routes>
          {/* Use DraggableTaskList instead of TaskList for drag-and-drop functionality */}
          <Route path="/tasks" element={<DraggableTaskList tasks={filteredTasks} setTasks={setTasks} />} />
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
          {/* Default Route */}
          <Route path="/" element={<DraggableTaskList tasks={filteredTasks} setTasks={setTasks} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
