const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { PORT } = process.env;

const app = require("./app");
app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});
