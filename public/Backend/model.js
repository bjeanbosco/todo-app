const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
    {
        name: String
    },
    {timestamps: true}
)

const Todo = mongoose.model('Todo',TodoSchema)

module.exports = Todo