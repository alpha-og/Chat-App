const express = require("express");
const app = express();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const urlPrefix = "/api/v1";

const authRoutes = require("./routes/authRoutes");
app.use(urlPrefix, authRoutes);
// const chatRoutes = require("./routes/chat");
// app.use(chatRoutes);
// const userRoutes = require("./routes/user");
// app.use(userRoutes);

const error = require("./middleware/error");
app.use(error);
module.exports = app;
