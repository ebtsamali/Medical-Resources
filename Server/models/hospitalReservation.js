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
    patientID: {
        type: String, 
        required: [true, "National Identity is required"],
        validate: function (val) {
                    if(val.trim().length === 0) {
                        throw new Error('National Identity can not be empty')
                    }
                    if(val.trim().length !== 14){
                        throw new Error('National Identity must be 14 number')
                    }
                    if(!val.trim().match(/^[0-9]+$/)) {
                        throw new Error('National Identity not valid')
                    }
                }
    },
    patientPhone: {
        type: String, 
        required: [true, "Patient Phone Number is required"],
        validate: function (val) {
            if(val.trim().length === 0) {
                throw new Error('Patient Phone Number can not be empty')
            }
            if(!val.trim().match(/^[0-9]+$/)) {
                throw new Error('Phone Number not valid')
            }
        }
    },
    bed: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Bed data is required!'],
        ref: 'Bed'
    },

    totalDays: {
        type: Number,
        // required: [true, "Total Cost is required"]
    },
    totalCost: {
        type: Number,
        // required: [true, "Total Cost is required"]
    },
    timeLimit: {
        type: Number,
        required: [true, "Time Limit is required"],
        validate: function (val) {
            console.log(val)
            if(!val.toString().trim().match(/^[0-9]+$/) && val<0) {
                throw new Error('Time Limit must be a positive number')
            }
        }
    },
    status: {
        type: String,
        enum: ['pending', 'fulfilled', 'cancelled'],
        default: 'pending'
    }
},{
    timestamps: true,
})

const HospitalReservation = mongoose.model('HospitalReservation', hospitalReservationSchema);

module.exports = HospitalReservation;