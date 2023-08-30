const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    questionType: {
        type: Number,
        required: true
    },
    optionA: {
        type: String
    },
    optionB: {
        type: String
    },
    optionC: {
        type: String
    },
    optionD: {
        type: String
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})