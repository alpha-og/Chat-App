const mongoose = require("mongoose");

const { requiredFieldErrorMsg } = require("../utils/constants");

const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    msgs: [
        {
            content: {
                type: String,
                required: [true, requiredFieldErrorMsg("Message content")],
            },
            sender: {
                type: Schema.Types.ObjectId,
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
});

module.exports = mongoose.model("chats", chatSchema);
