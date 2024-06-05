const mongoose = require('mongoose');
const Todo = require('../models/task.model');

const CONNECT_DB_STRING = 'mongodb://localhost/todo_app_seneca';

mongoose.connect(CONNECT_DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = function tasksService() {
    // Добавление задачи
    this.add({ role: 'todo', cmd: 'add' }, async (msg, respond) => {
        const { description } = msg.args.body;
        try {
            const todo = await Todo.create({ description });
            respond(null, { todo });
        } catch (err) {
            respond(err);
        }
    });
    // Получение всех задач
    this.add({ role: 'todo', cmd: 'getAll' }, async (msg, respond) => {
        try {
            const todos = await Todo.find();
            respond(null, { todos });
        } catch (err) {
            respond(err);
        }
    });
    // Удаление задачи
    this.add({ role: 'todo', cmd: 'delete' }, async (msg, respond) => {
        const { id } = msg.args.params;
        try {
            await Todo.findByIdAndDelete(id);
            respond(null, { success: true });
        } catch (err) {
            respond(err);
        }
    });
    // Редактирование описания задачи
    this.add({ role: 'todo', cmd: 'edit' }, async (msg, respond) => {
        const { id } = msg.args.params;
        const newText = msg.args.body.description;
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(id, { description: newText }, { new: true });
            respond(null, { todo: updatedTodo });
        } catch (err) {
            respond(err);
        }
    });
};
