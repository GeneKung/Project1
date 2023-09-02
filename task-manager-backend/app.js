const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'genekung',
  password: 'gene428',
  database: 'task_app',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tasksRouter = require('./routes/Task');
app.use('/api', tasksRouter);

app.get('/', (req, res) => {
  res.send('Task Manager API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
