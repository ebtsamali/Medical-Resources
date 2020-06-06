const mongoose = require('mongoose');

const location = new mongoose.Schema({
    governorate: {
        type: String, 
        required: [true, "governorate is required"]
    },
    district: {
        type: String, 
        required: [true, "district is required"]
    },
    street: {
        type: String, 
        required: [true, "street is required"] 
    }
})

const hospitalSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "Admin is required"], 
    },
    name: {
        type: String, 
        required: [true, "Name is required"], 
        minlength: 2
    },

    location: [location],

    phoneNumber: [{ 
        type: String,
        required: [true, "phone number is required"]
    }],

    regulations: {
        type: String,
    }
}, {
    timestamps: true,
})

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;