const {
    createChat,
    deleteChat,
    createMessage,
    getChats,
    deleteMessage,
} = require("../controllers/chatControllers");
const { isAuth } = require("../middleware/authStateHandler");

const Router = require("express").Router();

Router.route("/chats").get(isAuth, getChats);
Router.route("/chats/chat/new").post(isAuth, createChat);
Router.route("/chats/chat/delete/:_id").delete(isAuth, deleteChat);
Router.route("/chats/chat/:_id")
    .post(isAuth, createMessage)
    .delete(isAuth, deleteMessage);

module.exports = Router;
