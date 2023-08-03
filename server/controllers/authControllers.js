const ErrorHandler = require("../utils/ErrorHandler");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const userModel = require("../models/userModel");
const { setJwt, unsetJwt } = require("../utils/jwtHandler");

const signUp = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return next(
            new ErrorHandler(400, "User with provided email already exists")
        );
    }
    user = await userModel.create({ email, password });

    setJwt(user, 201, res);
});

const signIn = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(400, "Incorrect email or password"));
    }
    const match = await user.comparePasswords(password);

    if (!match) {
        return next(new ErrorHandler(400, "Incorrect email or password"));
    }
    setJwt(user, 201, res);
});

const signOut = async (req, res, next) => {
    unsetJwt(res);
};

module.exports = { signUp, signIn, signOut };
