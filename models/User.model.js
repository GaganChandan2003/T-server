const mongoose = require('mongoose');

//Schema
const userModel = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

//Model
const UserModel = mongoose.model('user', userModel);
module.exports = UserModel;