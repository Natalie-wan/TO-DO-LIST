import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import TaskForm from './Components/TaskForm';
import CategoryFilter from './Components/CategoryFilter';
import TaskList from './Components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]); // State for all tasks
    const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
    const [error, setError] = useState(null); // State for error handling

    // Fetch tasks from JSON server on mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3001/tasks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTasks(data); // Set all tasks
                setFilteredTasks(data); // Initialize filteredTasks with all tasks
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks. Please try again later.');
            }
        };

        fetchTasks();
    }, []); // Only run once when the component mounts

    // Add new task handler
    const handleAddTask = async (newTask) => {
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const createdTask = await response.json();
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setFilteredTasks((prevTasks) => [...prevTasks, createdTask]); // Add new task to filteredTasks
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Please try again later.');
        }
    };

    // Extract unique categories from tasks
    const categories = [...new Set(tasks.map((task) => task.category))];

    // Handle category filter changes
    const handleFilter = (selectedCategory) => {
        if (selectedCategory === 'All') {
            setFilteredTasks(tasks); // Show all tasks
        } else {
            const filtered = tasks.filter((task) => task.category === selectedCategory);
            setFilteredTasks(filtered); // Show tasks for the selected category
        }
    };

    // Update tasks order in the JSON server
    const updateTasksOrder = async (reorderedTasks) => {
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reorderedTasks),
            });
            if (!response.ok) {
                throw new Error('Failed to update tasks order');
            }
        } catch (error) {
            console.error('Error updating tasks order:', error);
        }
    };

    // Handle task reordering after drag and drop
    const handleTaskReorder = (reorderedTasks) => {
        // Update the filtered tasks
        setFilteredTasks(reorderedTasks);

        // Update the full tasks list
        const updatedTasks = tasks.map((task) => {
            const reorderedTask = reorderedTasks.find((t) => t.id === task.id);
            return reorderedTask ? reorderedTask : task;
        });
        setTasks(updatedTasks);

        // Persist the new order to the server
        updateTasksOrder(updatedTasks);
    };

    return (
        <div>
            <Router>
                <NavBar />
                <h1 style={{ textAlign: 'center' }}>To-Do List</h1>

                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}{' '}
                {/* Display error message */}
                <Routes>
                    {/* Tasks route - shows all tasks */}
                    <Route
                        path="/tasks"
                        element={<TaskList tasks={tasks} onTasksReorder={handleTaskReorder} />}
                    />

                    {/* Add task route */}
                    <Route
                        path="/add-task"
                        element={<TaskForm onAddTask={handleAddTask} categories={categories} />}
                    />

                    {/* Categories route - shows filter and filtered tasks */}
                    <Route
                        path="/categories"
                        element={
                            <>
                                <CategoryFilter
                                    categories={categories}
                                    onFilter={handleFilter}
                                />
                                <TaskList tasks={filteredTasks} onTasksReorder={handleTaskReorder} />
                            </>
                        }
                    />

                    {/* Default route */}
                    <Route
                        path="/"
                        element={<TaskList tasks={tasks} onTasksReorder={handleTaskReorder} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
