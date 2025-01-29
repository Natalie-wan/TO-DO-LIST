import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import axios from "axios";

function DragDropContainer() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data); // Update tasks state with fetched data
        setIsLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) return; // If dropped in a different list, do nothing

    // Reorder tasks
    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks); // Update tasks state with the new order
  };

  // Render loading state while data is being fetched
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  // Render the drag-and-drop container
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.length > 0 ? ( // Ensure tasks are available before rendering Draggable components
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()} // Ensure draggableId is a string
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor:
                          task.priority === "High"
                            ? "red"
                            : task.priority === "Medium"
                            ? "orange"
                            : "green",
                        color: task.priority === "High" ? "white" : "black",
                        padding: "10px",
                        margin: "10px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <h2>{task.title}</h2>
                      <p>Category: {task.category}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Due Date: {task.dueDate}</p>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div>No tasks available.</div> // Fallback if tasks are empty
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropContainer;