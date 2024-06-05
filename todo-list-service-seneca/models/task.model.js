const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: String,
    isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TaskSchema);
