const ErrorHandler = require("../utils/ErrorHandler");

const error = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.status).json({
        success: false,
        error: err.message,
    });
};

module.exports = error;
