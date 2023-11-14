const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commitment_dumpSchema = new Schema({
    is_custom: {
        type:String,
        required:true,
    },
    text: {
        type: String,
        required:true,
    },
    discription: {
        type: String,
        required:true,
    },
    is_commitment: {
        type: String,
        required:true,
    },
    is_completed: {
        type: String,
        required:true,
    },
    time_taken_to_complete: {
        type: String,
        required:true,
    },
    complete_time_range: {
        type: String,
        required:true,
    },
    user_id: {
        type: String,
        required:true,
    },
    asset_for_all: {
        type: String,
        required:false,
    },
})
const commitment_dump = model("commitment_dump", commitment_dumpSchema );

module.exports = commitment_dump;