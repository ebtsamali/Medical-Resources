const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "First Name is required"], 
        minlength: 2
    },

    lastName: {
        type: String, 
        required: [true, "Last Name is required"], 
        minlength: 2
    },

    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    image: {type: String},

    phoneNumber: { 
        type: String,
        required: [true, "phone number is required"]
    },

    address: {
        governorate: {type: String},
        district:  {type: String},
        street:  {type: String},
        blockNum:  {type: String},
        flatNum:  {type: String}
    },

    role: { type: String,
        enum : ['user','pharmacy', 'hospital'],
        default: 'user'
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
