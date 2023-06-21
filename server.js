// module imports
const express = require("express");
const app = express();
const path = require("path")

// global constant declarations
const port = 8000;

// folders for static serving
app.use(express.static("HTML_files"));
app.use(express.static("CSS_files"));
app.use(express.static("JS_files"));

// enable the server to parse the body
app.use(express.json())

//post routes
app.post("/home/search", (req, res) => {
    const searchQuery = req.body.query;
    res.send(`Hello there, ${searchQuery}`)
})

// get routes
app.get("/home", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "home.html");
    res.sendFile(filePath);
})

app.get("/signup", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signup.html");
    res.sendFile(filePath);
})

app.get("/signin", (req, res) => {
    const filePath = path.join(__dirname,"HTML_files", "signin.html");
    res.sendFile(filePath);
})

//initiate localserver and listen for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})