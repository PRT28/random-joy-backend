const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const joys_dumpSchema = new Schema({
    sent_to: {
        type:String,
        required:true,
    },
    sent_by: {
        type: String,
        required:true,
    },
    is_forced: {
        type: String,
        required:true,
    },
    is_liked: {
        type: String,
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
    sub_category: {
        type: String,
        required:true,
    },
    sub_sub_category: {
        type: String,
        required:true,
    },
    keywords: {
        type: String,
        required:true,
    },
    is_mystery: {
        type: String,
        required:true,
    },
    asset_opened_with: {
        type: String,
        required:true,
    },
    retry_assets: {
        type: String,
        required:true,
    },
})
const joys_dump = model("puzzle_dump", joys_dumpSchema );

module.exports = joys_dump;