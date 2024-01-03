const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    user: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = model("User",UserSchema,"users");