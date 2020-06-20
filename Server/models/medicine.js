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
        required: [true, "Price is required"],
        validate: function (val) {
            if(!val.toString().trim().match(/^[0-9]+$/) || val<=0) {
                throw new Error('Invalid Price')
            }
        }
    },
    quantity: {
        type: Number,
        required: [true, "Available Quantity is required"],
        validate: function (val) {
            if(!val.toString().trim().match(/^[0-9]+$/) && val<0) {
                throw new Error('Quantity must be a positive number')
            }
        }
    }
},{
    timestamps: true,
})

medicineSchema.post('save', function (error, doc, next) {
        const keys = Object.keys(error.errors);
        const errors = keys.reduce((acc,key)=>{
            return {
                ...acc,
                [key.split('.')[key.split('.').length - 1]]:error.errors[key].properties.message
            }
        },{})
        next({errors});

})


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
