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

    userAddress: {
        type: String,
        required: [true, 'Address is required!']
    },

    userPhone: {
        type: String,
        required: [true, 'Phone Number is required!'],
        validate: function (val) {
            if (!val.trim().match(/^(012|011|010)[0-9]{8,8}$/)) {
                throw new Error('Invalid Phone Number Format.')
            }

        }
    },

    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered'],
        default: 'placed'
    },

}, {
    timestamps: true,
})


medicineOrderSchema.post('save', function (error, doc, next) {
    const keys = Object.keys(error.errors);
    const errors = keys.reduce((acc, key) => {
        return {
            ...acc,
            [key.split('.')[key.split('.').length - 1]]: error.errors[key].properties.message
        }
    }, {})
    next({errors});

})

const MedicineOrder = mongoose.model('MedicineOrder', medicineOrderSchema);

module.exports = MedicineOrder;
