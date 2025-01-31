import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import axios from "axios";

function DragDropContainer({ tasks, setTasks }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) return;

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  // Render loading state while data is being fetched
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  // Render error state if there's an error
  if (error) {
    return <div>{error}</div>;
  }

  // Render the drag-and-drop container
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              minHeight: "100px",
            }}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      role="button"
                      aria-label={`Drag and drop task: ${task.title}`}
                      tabIndex={0}
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
              <div>No tasks available.</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropContainer;