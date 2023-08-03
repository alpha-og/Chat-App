const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const getChats = asyncErrorHandler(async (req, res, next) => {
    const { _id } = req.user;
    const user = await userModel.findOne({ _id }).populate("chats");

    res.status(200).json({
        success: true,
        user,
    });
});

const createChat = asyncErrorHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { title, description, users } = req.body;
    let chat = await chatModel.create({
        title,
        description,
        users,
        createdBy: _id,
    });

    const user = await userModel.findOne({ _id });
    user.chats.push(chat._id);
    await user.save();
    res.status(201).json({
        success: true,
        chat,
    });
});

const deleteChat = asyncErrorHandler(async (req, res, next) => {
    const { _id } = req.params;
    const chat = await chatModel.findOne({ _id });

    if (!chat) {
        return next(
            new ErrorHandler(404, "Chat with provided ID does not exist")
        );
    }

    const user = await userModel.findOne({ _id: req.user._id });
    user.chats = user.chats.filter(
        (chat) => chat._id.toString() !== _id.toString()
    );
    await user.save();

    await chatModel.findOneAndDelete({ _id });
    res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
    });
});

const createMessage = asyncErrorHandler(async (req, res, next) => {
    const { _id: sender } = req.user;
    const { content } = req.body;
    if (!content) {
        return next(new ErrorHandler(400, "Message content cannot be empty"));
    }

    const { _id } = req.params;
    const chat = await chatModel.findOne({ _id });
    chat.messages.push({ content, sender });
    await chat.save();

    res.status(201).json({
        success: true,
        chat,
    });
});

const deleteMessage = asyncErrorHandler(async (req, res, next) => {
    const { _id: messageId } = req.body;
    const { _id } = req.params;
    const chat = await chatModel.findOne({ _id });
    if (!chat) {
        return next(
            new ErrorHandler(404, "Chat with provided ID does not exist")
        );
    }

    chat.messages = chat.messages.filter(
        (message) => message._id.toString() !== messageId
    );

    await chat.save();

    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
    });
});

module.exports = {
    getChats,
    createChat,
    deleteChat,
    createMessage,
    deleteMessage,
};
