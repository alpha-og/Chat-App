const mongoose = require("mongoose");

const connectMongoDB = (url) => {
    mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => {
            console.log(`Connected to MongoDB: ${url}`);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectMongoDB;
