// module imports
const express = require("express");
const mongoose = require("mongoose"); // required to use an abstraction layer over the 
// mongodb driver that simplifies code and allows access of mongodb documents as objects in the code

const path = require("path"); // required to obtain absolute path of a file in a given root directory
const { v4: uuidv4 } = require('uuid'); // required for creating unique user ids for every user and every chat
const bcryptjs = require("bcryptjs"); // required for encrypting data and passwords
const bodyParser = require('body-parser'); // required for parsing request bodies

// model module imports
const userModel = require('./models/userModel');

// global constant declarations
const maxAge = 1 * 24 * 60 * 60 * 1000

const {
    NODE_ENV = 'development',
    PORT = 8000,
    MONGO_URI = "mongodb://localhost:27017/",
    DB_NAME = "ChatApp",
    SESSION_LIFETIME = maxAge,
    SESSION_NAME = 'session_id',
    SESSION_SECRET = 'secret',
} = process.env;

const IN_PRODUCTION = NODE_ENV === 'production';

const app = express();

// establish a connection to the MongoDB database
mongoose.connect(MONGO_URI+DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log(`Connected to ${MONGO_URI+DB_NAME}`)
    // initiate localserver and listen for requests
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
})
.catch((err) => console.log(err));

// implementing middleware
app.use(express.static("HTML_files")); // folder for static serving
app.use(express.static("CSS_files")); // folder for static serving
app.use(express.static("JS_files")); // folder for static serving

app.use(bodyParser.urlencoded({ extended: true })); // enable the server to parse the body
app.use(express.json())
app.use(session({
    name: SESSION_NAME, // assign the store/db a name
    resave: false, // resave set to false makes it so that the sessions are not sent to the store if they were never modified
    saveUninitialised: false, // saveUninitialised set to false prevents new sessions with no data from being sent to the store
    secret: SESSION_SECRET, // stored only only on the server and is sed to sign the cookie to prevent unsolicited changes to the cookie
    cookie: { // by default the cookie is set to HTTPOnly which prevents client side scripts from accessing the cookie data
        maxAge: SESSION_LIFETIME, // sets the time duration beyond which the cookie is invalidated
        sameSite: true, // restricts access of the cookie to the domain in which it was issued
        secure: IN_PRODUCTION, // secure attribute is used to specify if the cookie is to be sent only on HTTPS
    }
}))

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
            res.json({success: true})
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