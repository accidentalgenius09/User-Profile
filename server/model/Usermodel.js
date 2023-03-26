const mongoose = require('mongoose')

const User = mongoose.model('User',{
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },
    email: {
        type: String,
        unique: [true, "Email Exist"]
    },
    firstname: String,
    lastname: String,
    mobile: {
        type: String,
        required: [true, "Please enter a mobile number"],
        unique: [true, "Mobile number already exist"]
    },
    address: String,
    profile: String
});


module.exports = {
    User
}
