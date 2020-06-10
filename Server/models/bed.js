const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'hospital is required!'],
        ref: 'Hospital'
    },
    roomNumber: {
        type: Number,
        required: [true, "Room Number is required"]
    },
    dayCost: {
        type: Number,
        required: [true, "Day Cost is required"]
    },
    reserved: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
})

const Bed = mongoose.model('Bed', bedSchema);

module.exports = Bed;