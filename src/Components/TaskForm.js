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
    }
}