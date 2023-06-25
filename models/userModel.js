// module imports
const mongoose = require("mongoose"); // required to use an abstraction layer over the 
// mongodb driver that simplifies code and allows access of mongodb documents as objects in the code

const { v4: uuidv4 } = require('uuid'); // required for creating unique user ids for every user and every chat

// define the document structure nested document "chats"
const msgSchema = mongoose.Schema({
    msg_uuid: {
        type: 'UUID',
        default: uuidv4,
    },
    origin: {
        type: 'UUID',
        required: true,
    },
    msg_sent:{
        type: Date,
        default: Date.now,
    },
    msg_content: {
        type: String,
        required: true,
    }
}, { _id : false });

// define the document structure nested document "chats"
const chatSchema = mongoose.Schema({
    chat_uuid: {
        type: 'UUID',
        default: uuidv4,
    },
    chat_created:{
        type: Date,
        default: Date.now,
    },
    msgs: {
        type: msgSchema,
    }
}, { _id : false });

// define the document structure nested document "chats"
const sessionSchema = mongoose.Schema({
    session_uuid: {
        type: 'UUID',
        default: uuidv4,
    },
    session_created:{
        type: Date,
        default: Date.now,
    },
    isAuth: {
        type: Boolean,
        default: false,
    }
}, { _id : false });

// define the document structure for document "Users"
const userSchema = mongoose.Schema({
    uuid: {
        type: 'UUID',
        default: uuidv4,
    },
    fname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    chats: {
        type: chatSchema,
    },
    session: {
        type: sessionSchema,
    },
});

// create a mongoose model (an interface/ wrapper of schema with mongodb) for collection "Users"
// the model method implicitly creates a collection with specified name (the name passed is converted to plural form if it is in singular form)
module.exports = new mongoose.model("user", userSchema) // returns a document object constructor using the passed schema