// importing the necessary content from the downloaded react-beautify-dnd
 import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";
 //importing libraries
  import React,{useState,useEffect} from "react";
  import axios from 'axios'; // used for making http request to fetch data from the server 

 function DragDropContainer (){
     const [tasks,setTasks] = useState([]);

     //useEffects that fetch tasks when component mounts
      useEffect(() =>{
        axios.get('http://localhost:3001/tasks') // Get request fetching tasks from the server
         .then (response =>{  
            //update the tasks state with the fetched data
             setTasks(response.data);
         })

         .catch(error=>{
            //log any error that occurs during the request
            console.error(error);
         });

      }, []); //empty dependancies arrays ensure to run once on mount 


       const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } =result;

        if (source.droppableId !== destination.droppableId) {
            return;
        }

        const reorderedTasks = [...tasks];
        const[removed] = reorderedTasks.splice(source.index,1);

        reorderedTasks.splice(destination.index,0,removed);

        setTasks(reorderedTasks);

       };

       return (
         <DragDropContext onDragEnd={handleDragEnd}>
         <Droppable droppableId="droppable-1">
            {
                (provided)=> (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task,index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index} >

                                {
                                    (provided) => (
                                        <div>
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            
                                        </div>
                                    )
                                }




                            </Draggable>
                        ))}
                    </div>
                )
            }

         </Droppable>






         </DragDropContext>

       )

 }