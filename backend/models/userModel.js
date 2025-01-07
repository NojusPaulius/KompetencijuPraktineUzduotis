const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match",
        },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
     questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
    ]
})

userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  });

userSchema.methods.correctPassword = async (
    candidatePassword,
    userPassword) => {
        return await bcrypt.compare(candidatePassword, userPassword)
    };

const User = mongoose.model("User", userSchema);

module.exports = User;