const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const puzzle_dumpSchema = new Schema({
    sent_by: {
        type:String,
        required:true,
    },
    sent_to: {
        type: String,
        required:true,
    },
    asset_used: {
        type: String,
        required:true,
    },
    tries_needed: {
        type: String,
        required:true,
    },
    puzzle_type: {
        type: String,
        required:true,
    },
    solved_on_first_try: {
        type: String,
        required:true,
    }
})
const puzzle_dump = model("puzzle_dump", puzzle_dumpSchema );

module.exports = puzzle_dump;