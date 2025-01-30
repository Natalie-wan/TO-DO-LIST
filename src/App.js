import React, { useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
//import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
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
      <h1>To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
export default App;