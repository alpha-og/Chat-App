// module imports
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // required to use an abstraction layer over the 
// mongodb driver that simplifies code and allows access of mongodb documents as objects in the code

const path = require("path"); // required to obtain absolute path of a file in a given root directory
const { v4: uuidv4 } = require('uuid'); // required for creating unique user ids for every user and every chat
const bcryptjs = require("bcryptjs"); // required for encrypting data and passwords
const bodyParser = require('body-parser'); // required for parsing request bodies

// model module imports
const userModel = require('./models/userModel');

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

// implementing middleware
app.use(express.static("HTML_files")); // folder for static serving
app.use(express.static("CSS_files")); // folder for static serving
app.use(express.static("JS_files")); // folder for static serving

app.use(bodyParser.urlencoded({ extended: false })); // enable the server to parse the body
app.use(express.json())
// get routes
app.get("/signup", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signup.html");
    res.sendFile(filePath);
});

app.get("/signin", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signin.html");
    res.sendFile(filePath);
});

app.get("/home", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "home.html");
    res.sendFile(filePath);
});

// post routes
app.post("/signup", async (req, res) => {
    const {fname, email, password, confirmPassword} = req.body;
    const validInputs = validateName(fname) && validateEmail(email) && validatePassword(password, confirmPassword);
    const hashedPassword = await bcryptjs.hash(password, 14);
    if (validInputs){
        const user = new userModel({
            fname: fname,
            email: email,
            password: hashedPassword,
        })
        user.save()
        .then((result) => {
            // console.log(result)
            res.redirect("/signin");
        })
        .catch((err) => {
            switch (err.code) {
                case 11000:
                    res.send("User with provided email already exists");
                    break;
                default:
                    console.log(err.message)
                    break;
            }
        })
    }
    else {
        console.log("error")
    }
});

app.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    let currentUser = await userModel.findOne({email: email});
    if (currentUser){
        const match = await bcryptjs.compare(password, currentUser.password)
        if (match){
            const result = await userModel.updateOne({uuid: currentUser.uuid}, {session: {session_uuid: uuidv4(), isAuth: true}})
            currentUser = await userModel.findOne({email: email});
            res.json({uuid: currentUser.uuid, session_uuid: currentUser.session.session_uuid, isAuth: currentUser.session.isAuth})
        }
        else{
            console.log("Invalid email or password")
        }
    }
    else{
        console.log("Invalid email or password")
    }
});

app.post("/signout", async (req, res) => {
    const {uuid, session_uuid, isAuth} = req.body;
    const currentUser = await userModel.findOne({uuid: uuid});
    if (currentUser.session.session_uuid === session_uuid){
        const result = await userModel.updateOne({uuid: uuid}, {session: {session_uuid: null, session_created: null, isAuth: false}})
        res.redirect("/signin");
    }
})

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