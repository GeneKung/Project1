const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Define your MySQL configuration
const db = mysql.createPool({
  host: 'localhost',
  user: 'genekung',
  password: 'gene428',
  database: 'task_app',
});

// Example route to fetch tasks
router.get('/gettasks', (req, res) => {
  const query = 'SELECT * FROM tasks'; // Replace 'tasks' with your MySQL table name

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve tasks from the database' }); // Custom error message
    } else {
      res.json(results);
    }
  });
});

// Add a new task to the 'tasks' table
router.post('/tasks', (req, res) => {
  // Extract task data from the request body
  const { title, description } = req.body;

  // Check if 'title' and 'description' are provided
  if (!title || !description) {
    return res.status(400).json({ error: 'Both title and description are required' });
  }
  

  // SQL query to insert a new task
  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';

  // Execute the SQL query with the provided values
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add a new task to the database' });
    } else {
      // Return the ID of the newly created task
      console.log("[New task posted] title:", title , "description:", description);
      res.json({ id: result.insertId, title, description });
    }
  }); 
});

router.delete('/delete/:taskId', (req, res) => {
  const {taskId} = req.params;
  
  if(!taskId) {
    return res.status(400).json({ error: "Must be deleting a task with a valid ID"})
  }

  const query = 'DELETE FROM tasks WHERE id = ?';
  
  db.query(query, [taskId], (err, result) => {
    if(err) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the task" });
    } else {
      console.log("[Deleting task] with id: ", taskId)
      res.status(200).json({ message: "Task deleted successfully" })
    }
  })

})

module.exports = router;
