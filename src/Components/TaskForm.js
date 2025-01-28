import React, { use, useState } from "react";

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

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                <h2>Add New Task</h2>
                {/**Title input */}
                <input type="text" placeholder="Task Title" value={title} 
                onChange={(e) => setTitle(e.target.value)} />

                {/**Category input */}
                <input type="text" placeholder="Category" value={category} 
                onChange={(e) => setCategory(e.target.value)} />
            </form>
        </div>
    )
}