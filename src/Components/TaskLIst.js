import React, { useState, useEffect } from 'react';
import styles from './TaskItem.module.css'; // Import CSS Module

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3001/tasks');
  const data = await response.json();
  return data;
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={getPriorityClass(task.priority)}>
            <h3>{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  function getPriorityClass(priority) {
    switch (priority) {
      case 'High':
        return styles.highPriority;
      case 'Medium':
        return styles.mediumPriority;
      case 'Low':
        return styles.lowPriority;
      default:
        return '';
    }
  }
};

export default TaskList;
