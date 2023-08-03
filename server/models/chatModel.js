const mongoose = require("mongoose");

const { requiredFieldErrorMsg } = require("../utils/constants");

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled",
    },
    description: String,
    avatar: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    messages: [
        {
            content: {
                type: String,
                required: [true, requiredFieldErrorMsg("Message content")],
            },
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            timeStamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});

module.exports = mongoose.model("chats", chatSchema);
