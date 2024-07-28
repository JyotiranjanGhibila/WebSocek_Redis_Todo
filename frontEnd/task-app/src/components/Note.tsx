import axios from 'axios';
import React, { useEffect, useState } from 'react'
import socket from '../services/socketService';
import noteIcn from '../assets/noteIcn.png'
import './note.css'
import { MdAddCircle } from "react-icons/md";

interface Task {
    description: string;
  }

const Note = () => {
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
      // Fetch all tasks when the component mounts
      fetchTasks();
  
      // Listen for real-time task updates
      socket.on('taskAdded', (task: Task) => {
        setTasks(prevTasks => [...prevTasks, task]);
      });
  
      return () => {
        socket.off('taskAdded');
      };
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('https://fullstack-task-jyotiranjan-ghibila-ih9p.onrender.com/api/tasks/fetchAllTasks');
        console.log("res:", response)
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    const addTask = () => {
      socket.emit('add', { description });
      setDescription('');
      fetchTasks()
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addTask();
    };
  
    return (
      <div className="container mx-auto p-4 h-screen flex items-center justify-center">
        <div className='rounded-md p-5 shadow-sm shadow-gray-400 noteCon'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className='flex items-start gap-3'>
            <img src={noteIcn} alt="icn"/>
            <h1 className='text-3xl font-bold'>Note App</h1>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              id="description"
              value={description}
              placeholder='New Note...'
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
            type="submit"
            className="add-btn"
          >
           <span><MdAddCircle/></span> <span>Add</span>
          </button>
          </div>
          
        </form>
        <div className='allTasks mt-6'>
        <div className='task'>
                  <p className='font-bold text-xl'>Note</p>
                 </div>
             {
              tasks.length > 0 && tasks?.map((task, index) => (
                 <div className='task' key={index}>
                  <p>{task.description}</p>
                 </div>
              ))
             }
        </div>
        </div>
      </div>
    );
}

export default Note
