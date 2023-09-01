const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['Not Done', 'In Progress', 'Completed'],
    default: 'Not Done',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;