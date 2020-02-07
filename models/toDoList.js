const mongoose = require("mongoose")

const toDoListSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        default: "salam"
    },
    Date: {
        type: String,
        required: true,
        default: Date.now()
    },
    IsDone: {
        type: String,
        required: false,
        default: "false"
    },
    Description: {
        type: String,
        required: false,
        default: null
    },
    PriorityType: {
        type: String,
        required: true,
        default: "medium"
    }
})

module.exports = mongoose.model('toDoList', toDoListSchema)