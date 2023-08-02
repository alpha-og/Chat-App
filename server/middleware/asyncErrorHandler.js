const asyncErrorHandler = (func) => async (req, res, next) => {
    Promise.resolve(func).catch(next);
};

module.exports = asyncErrorHandler;
