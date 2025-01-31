import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import CategoryFilter from './Components/CategoryFilter';

function App() {
    // State management
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tasks on component mount
    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3001/tasks")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                setFilteredTasks(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // Handle adding new task
    const handleAddTask = (newTask) => {
        // Add ID to the new task
        const taskWithId = { 
            ...newTask, 
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        
        fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskWithId),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add task');
                }
                return response.json();
            })
            .then((createdTask) => {
                const updatedTasks = [...tasks, createdTask];
                setTasks(updatedTasks);
                
                // Update filtered tasks if the new task matches the current filter
                if (selectedCategory === 'All' || createdTask.category === selectedCategory) {
                    setFilteredTasks(prev => [...prev, createdTask]);
                }
            })
            .catch((error) => {
                console.error("Error adding task:", error);
                setError(error.message);
            });
    };

    // Handle category filtering
    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((task) => task.category === category);
            setFilteredTasks(filtered);
        }
    };

    // Handle task reordering after drag and drop
    const handleTaskReorder = (reorderedTasks) => {
        setFilteredTasks(reorderedTasks);
        // If we're showing all tasks, update the main tasks array too
        if (selectedCategory === 'All') {
            setTasks(reorderedTasks);
        } else {
            // If we're showing filtered tasks, we need to update the main tasks array
            // while preserving the tasks that aren't currently visible
            const nonFilteredTasks = tasks.filter(
                task => task.category !== selectedCategory
            );
            const newTasks = [...nonFilteredTasks, ...reorderedTasks].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setTasks(newTasks);
        }
    };

    // Loading state
    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading tasks...</div>;
    }

    // Error state
    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
            Error: {error}
        </div>;
    }

    return (
        <div>
            <Router>
                <NavBar />
                <h1 style={{ 
                    textAlign: "center",
                    color: "#333",
                    margin: "1rem 0",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}>
                    Task Management System
                </h1>
                
                <Routes>
                    <Route 
                        path="/tasks" 
                        element={
                            <>
                                <CategoryFilter 
                                    categories={[...new Set(tasks.map(task => task.category))]}
                                    onFilter={handleFilter}
                                    selectedCategory={selectedCategory}
                                />
                                <TaskList 
                                    tasks={filteredTasks} 
                                    onFilter={handleFilter}
                                    onReorder={handleTaskReorder}
                                />
                            </>
                        } 
                    />
                    <Route 
                        path="/add-task" 
                        element={
                            <TaskForm 
                                onAddTask={handleAddTask}
                                existingCategories={[...new Set(tasks.map(task => task.category))]}
                            />
                        } 
                    />
                    <Route
                        path="/categories"
                        element={
                            <>
                                <CategoryFilter
                                    categories={[...new Set(tasks.map(task => task.category))]}
                                    onFilter={handleFilter}
                                    selectedCategory={selectedCategory}
                                />
                                <TaskList 
                                    tasks={filteredTasks}
                                    onFilter={handleFilter}
                                    onReorder={handleTaskReorder}
                                />
                            </>
                        }
                    />
                    <Route 
                        path="/" 
                        element={
                            <TaskList 
                                tasks={filteredTasks}
                                onFilter={handleFilter}
                                onReorder={handleTaskReorder}
                            />
                        } 
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;