const express = require("express");
const app = express();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const urlPrefix = "/api/v1";

const authRoutes = require("./routes/authRoutes");
app.use(urlPrefix, authRoutes);
const chatRoutes = require("./routes/chatRoutes");
app.use(urlPrefix, chatRoutes);
// const userRoutes = require("./routes/userRoutes");
// app.use(urlPrefix, userRoutes);

const error = require("./middleware/error");
app.use(error);
module.exports = app;
