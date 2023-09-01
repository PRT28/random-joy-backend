const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PuzzleSchema = new Schema({
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

const PuzzleModel = model("puzzle", PuzzleSchema);

module.exports = PuzzleModel;