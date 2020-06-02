const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;
