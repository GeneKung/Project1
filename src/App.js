import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import axios from 'axios';
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    console.log("New Task Data:", newTask);
    setTasks([...tasks, newTask]);
  };

  const handleDeletedTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${taskId}`);
      // Remove the deleted task from the state
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/gettasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error => {
        console.error(error);
      }))
  }, []);

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task">
              <strong className="task-title">Title:</strong> {task.title} <strong className="task-description">Description:</strong> {task.description}
              <button className="delete-button" onClick={() =>
                handleDeletedTask(task.id)
              }>Delete</button>
            </div>
          ))
        ) : (
          <div className="no-tasks">No tasks available</div>
        )}
      </div>
    </div>
  );
}

export default App;