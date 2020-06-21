const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'hospital is required!'],
        ref: 'Hospital'
    },
    roomNumber: {
        type: Number,
        required: [true, "Room Number is required"],
        unique: true,
        
    },
    category: {
        type: String,
        enum: ['normal', 'intensive care'],
        required: [true, "Room Type is Required"],
        default: 'normal'
    },
    dayCost: {
        type: Number,
        required: [true, "Day Cost is required"]
    },
    reserved: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['normal', 'intensive care'],
        default: 'normal'
    },
},{
    timestamps: true,
})

const Bed = mongoose.model('Bed', bedSchema);

module.exports = Bed;