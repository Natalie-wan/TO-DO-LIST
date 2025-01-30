import React, { useState } from "react";

function TaskForm({ onAddTask }) {
    //States to manage form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");

    //Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validate input fields
        if (!title || !category || !priority || !dueDate) {
            alert("Please fill in all fields.");
            return;
        }

        //New task object
        const newTask = {
            title,
            category,
            priority,
            dueDate,
        };

        //Calling parent fuction to add the new task
        onAddTask(newTask);

        //Clear form input fields
        setTitle("");
        setCategory("");
        setPriority("");
        setDueDate("");
    };

    //Inline CSS Styles
    const styles = {
        container: {
            maxWidth: "400px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        heading: {
            textAlign: "center",
            marginBottom: "10px",
        },
        input: {
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
        },
        button: {
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "center",    
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Add New Task</h2>

                {/**Title input */}
                <input type="text" placeholder="Task Title" value={title} 
                onChange={(e) => setTitle(e.target.value)} style={styles.input} />

                {/**Category input */}
                <input type="text" placeholder="Category" value={category} 
                onChange={(e) => setCategory(e.target.value)} style={styles.input} />

                {/**Priority dropdown */}
                <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
                    <option value="" disabled>Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option> 
                </select>

                {/**Category dropdown */}
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                    <option value="" disabled>Select Category</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Finance">Finance</option>
                    <option value="Health">Health</option>
                </select>

                {/**DueDate input */}
                <input type="date" value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} style={styles.input} />

                {/**Submit button */}
                <button type="submit" style={styles.button}>Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;