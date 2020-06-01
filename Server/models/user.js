const mongoose = require('mongoose');
const validator = require('validator');

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
        trim: true,
        validate: {
            validator: function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error(`Email is not vaild.`);
                }
            },
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (value) {
                if (value.length < 8) {
                    throw new Error(`Password must be at least 8 symbols.`)
                }
            }
        }
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
