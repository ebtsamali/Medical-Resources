const mongoose = require('mongoose');

const order = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Medicine is required!'],
        ref: 'Medicine'
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    }
})

const medicineReservationSchema = new mongoose.Schema({
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Pharmacy is required!'],
        ref: 'Pharmacy'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user is required!'],
        ref: 'User'
    },

    order: [order],

    totalPrice: {
        type: Number,
        required: [true, "Total Price is required"]
    },

    // timeLimit: {
    //     type: Number,
    //     required: [true, "Time Limit is required"]
    // }
},{
    timestamps: true,
})

const MedicineReservation = mongoose.model('MedicineReservation', medicineReservationSchema);

module.exports = MedicineReservation;
