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

const medicineOrderSchema = new mongoose.Schema({
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

    userAddress : {
        type: String,
        required: [true, 'Address is required!']
    },

    userPhone: {
        type: String,
        required: [true, 'Phone Number is required!']
    },

    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered'],
        default: 'placed'
    }
},{
    timestamps: true,
})

const MedicineOrder = mongoose.model('MedicineOrder', medicineOrderSchema);

module.exports = MedicineOrder;