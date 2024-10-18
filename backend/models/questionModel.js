const mongoose = require("mongoose");
const { type } = require("os");

const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: Array,
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;