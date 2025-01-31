import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function TaskList({ tasks }) {

    const styles = {
        container: {
            maxWidth: "500px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
        },
        heading: {
            textAlign: "center",
            marginBottom: "20px",
        },
        list: {
            listStyle: "none",
            padding: "0",
        },
        taskItem: {
            marginBottom: "10px",
            padding: "12px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
        },
    };


    // Handle drag-and-drop reordering
    const handleDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list

        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);

        // Call the parent function to update the tasks order
        onTasksReorder(reorderedTasks);
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Task List</h2>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={styles.list}
                        >
                            {tasks.map((task, index) => {
                                let priorityStyle = {};
                                if (task.priority === "High") {
                                    priorityStyle = { backgroundColor: "red", color: "white" };
                                } else if (task.priority === "Medium") {
                                    priorityStyle = { backgroundColor: "orange" };
                                } else if (task.priority === "Low") {
                                    priorityStyle = { backgroundColor: "green", color: "white" };
                                }

                                return (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...styles.taskItem,
                                                    ...priorityStyle,
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <strong>{task.title}</strong> - {task.category} - {task.priority} - {task.dueDate}
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <ul style={styles.list}>
                {tasks.map((task) => {
                    let priorityStyle = {};
                    if (task.priority === "High") {
                        priorityStyle = { backgroundColor: "red", color: "white" };
                    } else if (task.priority === "Medium") {
                        priorityStyle = { backgroundColor: "orange" };
                    } else if (task.priority === "Low") {
                        priorityStyle = { backgroundColor: "green", color: "white" };
                    }

                    return (
                        <li
                            key={task.id}
                            style={{ ...styles.taskItem, ...priorityStyle }}
                        >
                            <strong>{task.title}</strong> - {task.category} - {task.priority} - {task.dueDate}
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}

export default TaskList;