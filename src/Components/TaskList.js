import React from "react";

function TaskList ({ tasks }) {
    return (
        <div>
            <ul style={{ listStyle: "none", padding: "0" }}>
                {tasks.map((task) => {
                    //Determine task styling based on priority
                    let priorityStyle = {};
                    if (task.priority === "High") {
                        priorityStyle = { backgroundColor: "red", color: "white"};
                    } else if (task.priority === "Medium") {
                        priorityStyle = { backgroundColor: "orange"};
                    } else if (task.priority === "Low") {
                        priorityStyle = { backgroundColor: "green", color: "white"}
                    }

                    return (
                        <li key={task.id} style={{
                            ...priorityStyle,
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                        }}>
                            <strong>{task.title}</strong> - {task.category} - {task.priority} - {""}
                            {task.dueDate} 
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default TaskList;