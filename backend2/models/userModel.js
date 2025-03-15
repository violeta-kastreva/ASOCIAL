const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {  // Changed from name to username
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 