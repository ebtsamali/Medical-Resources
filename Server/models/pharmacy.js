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

const pharmacySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"]
    },
    location: [location],

    phoneNumber: [
        { type: String,
        required: [true, "phone number is required"]
        }
    ],
    
    delivery: {
        type: Boolean,
        required: [true, "Delivery service status is required"]
    }
}, {
    timestamps: true,
})

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;