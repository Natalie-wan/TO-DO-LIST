<<<<<<< HEAD
import React from "react";
import "./App.css";
import DragDropContainer from "./Components/DragDropContainer";
=======
import React, { useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
//import './App.css';
>>>>>>> 2eb41d9189f88dbd8da62bc70781a6a90529a71a

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
<<<<<<< HEAD
    <div className="App">
      <h1>Todo List App</h1>
      <DragDropContainer />
=======
    <div>
      <h1>To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
>>>>>>> 2eb41d9189f88dbd8da62bc70781a6a90529a71a
    </div>
  );
}

export default App;