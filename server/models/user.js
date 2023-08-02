const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("json-web-token");

const { requiredFieldErrorMsg } = require("../utils/constants");
const { JWT_SECRET, JWT_EXPIRY } = process.env;
console.log(JWT_SECRET, JWT_EXPIRY);

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        minLength: [2, "Name must have atleast 2 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, requiredFieldErrorMsg("Email")],
    },
    password: {
        type: String,
        required: [true, requiredFieldErrorMsg("Password")],
        minLength: [8, "Password must have atleast 8 characters"],
    },
    avatar: String,
    chats: [
        {
            type: Schema.Types.ObjectId,
            ref: "chats",
        },
    ],
    resetPasswordToken: String,
    resetPasswordTokenExpiry: String,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwt = function () {
    return jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// TODO :- implement password reset token and expiry code

module.exports = mongoose.model("users", userSchema);
