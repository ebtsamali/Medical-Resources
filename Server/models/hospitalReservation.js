const mongoose = require('mongoose');

const hospitalReservationSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'hospital is required!'],
        ref: 'Hospital'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user is required!'],
        ref: 'User'
    },
    patientName: {
        type: String, 
        required: [true, "Patient Name is required"]
    },
    roomNumber: {
        type: Number,
        required: [true, "Room Number is required"]
    },
    dayCost: {
        type: Number,
        required: [true, "Day Cost is required"]
    },
    totalCost: {
        type: Number,
        required: [true, "Total Cost is required"]
    },
    timeLimit: {
        type: Number,
        required: [true, "Time Limit is required"]
    }
},{
    timestamps: true,
})

const HospitalReservation = mongoose.model('HospitalReservation', hospitalReservationSchema);

module.exports = HospitalReservation;