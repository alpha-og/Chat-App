const jwt = require("jsonwebtoken");

const setJwt = (user, status, res) => {
    const JWT = user.getJwt();
    const { COOKIE_EXPIRY } = process.env;
    const cookieOptions = {
        expires: new Date(Date.now() + COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(status).cookie("JWT", JWT, cookieOptions).json({
        success: true,
        user,
        JWT,
    });
};

const unsetJwt = (res) => {
    const cookieOptions = {
        expires: new Date(Date.now()),
        httpOnly: true,
    };

    res.status(200).cookie("JWT", "", cookieOptions).json({
        success: true,
        message: "Signed out successfully",
    });
};

module.exports = { setJwt, unsetJwt };
