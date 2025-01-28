// importing the necessary content from the downloaded react-beautify-dnd
 import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";
 //importing libraries
  import React,{useState,useEffect} from "react";
  import axios from 'axios'; // used for making http request to fetch data from the server 

 function DragDropContainer (){
     const [tasks,setTasks] = useState([]);

      useEffect(() =>{
        axios.get('http://localhost:3001/tasks')
         .then (response =>{
             setTasks(response.data);
         })

         .catch(error=>{
            console.error(error);
         });

      }, []);

 }