const mongoose = require("mongoose");
const { type } = require("os");
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    creator: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    comment: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',
    },
    question: {
        type: mongoose.Schema.Types.ObjectId, ref: "Question",
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
})


const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;