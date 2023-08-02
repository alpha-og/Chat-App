// configuration
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { PORT, MONGO_URL } = process.env;

// connecting to MongoDB
const connectMongoDB = require("./database");
connectMongoDB(MONGO_URL);

// initial express server
const app = require("./app");
app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});
