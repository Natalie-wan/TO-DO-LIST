import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const DraggableTaskList = ({ tasks, setTasks }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const handleDragEnd = async (result) => {
    console.log("Drag result:", result); // Debugging log
    if (!result.destination) return; // If dropped outside a valid destination

    // Reorder tasks
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    // Update state with new order
    setTasks(reorderedTasks);

    // Save updated order to backend by updating each task individually
    try {
      await Promise.all(
        reorderedTasks.map((task) =>
          axios.put(`http://localhost:3001/tasks/${task.id}`, task)
        )
      );
      console.log("Task order updated successfully");
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading tasks...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-w-4xl mx-auto p-4 space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={task.id.toString()} 
                draggableId={task.id.toString()} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 rounded-lg shadow-sm ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-400' : 'bg-green-600'} text-white transition-all duration-200`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <span className="text-sm">{task.dueDate}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-white/20 px-2 py-1 rounded text-sm">{task.category}</span>
                      <span className="bg-white/20 px-2 py-1 rounded text-sm">{task.priority}</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* This ensures space is reserved for dragging */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTaskList;
