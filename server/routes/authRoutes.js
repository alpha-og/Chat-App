const Router = require("express").Router();
const { signUp, signIn, signOut } = require("../controllers/authControllers");
const { isAuth } = require("../middleware/authStateHandler");

Router.route("/signUp").post(signUp);
Router.route("/signIn").post(signIn);
Router.route("/signOut").get(isAuth, signOut);

module.exports = Router;
