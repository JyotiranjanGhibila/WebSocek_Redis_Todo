const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

const Task = model('Jyotiranjan', taskSchema);

module.exports = Task;
