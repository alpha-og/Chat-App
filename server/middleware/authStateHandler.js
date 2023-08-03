const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./asyncErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");

const isAuth = asyncErrorHandler(async (req, res, next) => {
    const { JWT } = req.cookies;
    if (!JWT) {
        return next(new ErrorHandler(401, "Authentication required"));
    }

    const { JWT_SECRET } = process.env;
    const decodedJwt = jwt.verify(JWT, JWT_SECRET);
    req.user = await userModel.findOne({ _id: decodedJwt._id });
    next();
});

module.exports = { isAuth };
