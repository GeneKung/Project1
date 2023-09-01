import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCreateTask = async () => {
    try {
      //const response = await axios.post('/tasks', { title: taskTitle });
      const response = await axios.post('http://localhost:3000/tasks', { title: taskTitle });
      onTaskCreated(response.data);
      setTaskTitle(''); // Clear the input field
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
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
