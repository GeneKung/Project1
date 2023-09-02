import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', {
        title: taskTitle,
        description: taskDescription,
      });
      
      // Log the response for debugging
      console.log(response);
      console.log({taskTitle});
      console.log({taskDescription});

      onTaskCreated(response.data);
      setTaskTitle('');
      setTaskDescription('');
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task title"
        value={taskTitle}
        onChange={handleTaskTitleChange}
      />
      <input
        type="text"
        placeholder="Enter task description"
        value={taskDescription}
        onChange={handleTaskDescriptionChange}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
