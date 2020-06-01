const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Pharmacy is required!'],
        ref: 'Pharmacy'
    },
    name: {
        type: String, 
        required: [true, "Medicine Name is required"], 
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Available Quantity is required"]
    }
},{
    timestamps: true,
})

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;