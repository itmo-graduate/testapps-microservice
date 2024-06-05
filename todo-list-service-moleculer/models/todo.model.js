const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	description: { type: String, required: true },
	isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Todo", TodoSchema);
