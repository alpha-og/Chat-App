// module imports
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // required to use an abstraction layer over the 
// mongodb driver that simplifies code and allows access of mongodb documents as objects in the code

const path = require("path"); // required to obtain absolute path of a file in a given root directory
const { v4: uuidv4 } = require('uuid'); // required for creating unique user ids for every user and every chat
const bcryptjs = require("bcryptjs"); // required for encrypting data and passwords
const bodyParser = require('body-parser'); // required for parsing request bodies

// global constant declarations
const port = 8000;
const mongoURI = "mongodb://localhost:27017/";
const dbName = "ChatApp";


// establish a connection to the MongoDB database
mongoose.connect(mongoURI+dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log(`Connected to ${mongoURI+dbName}`)
    // initiate localserver and listen for requests
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
})
.catch((err) => console.log(err));

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
    username: String,
    email: {
        type: String,
        required: true,
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
})

// create a mongoose model (an interface/ wrapper of schema with mongodb) for collection "Users"
// the model method implicitly creates a collection with specified name (the name passed is converted to plural form if it is in singular form)
const User = new mongoose.model("User", userSchema) // returns a document object constructor using the passed schema

// folders for static serving
app.use(express.static("HTML_files"));
app.use(express.static("CSS_files"));
app.use(express.static("JS_files"));

// enable the server to parse the body
app.use(bodyParser.urlencoded({ extended: false }));

// get routes
app.get("/home", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "home.html");
    res.sendFile(filePath);
});

app.get("/signup", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signup.html");
    res.sendFile(filePath);
});

app.get("/signin", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signin.html");
    res.sendFile(filePath);
});

// post routes
app.post("/signup", async (req, res) => {
    const {fname, email, password, confirmPassword} = req.body;
    const validInputs = validateName(fname) && validateEmail(email) && validatePassword(password, confirmPassword);
    if (validInputs){
        const user = new User({
            fname: fname,
            email: email,
            password: bcryptjs.hash(password)
        })
        let result = await user.save();
        console.log(result);
        res.redirect("/signin");
    }
    else {
        console.log("error")
    }
});

app.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const currentUser = await User.findOne({email: email});
    if (currentUser){
        if (currentUser.password === password){
            res.redirect("/home")
        }
        else{
            console.log("Invalid email or password")
        }
    }
    else{
        console.log("Invalid email or password")
    }
});

function validateName(name){
    const regex = /[A-Za-z]+/;
    return regex.test(name)
}

function validateEmail(email){
    const regex = /^[\w.+_]+@[\w._]+\.[\w]+$/;
    return regex.test(email);
}

function validatePassword(password, confirmPassword){
    if (password !== confirmPassword){
        return false
    }
    else if ((password.length < 6)){
        return false
    }
    else {
        return true
    }
}