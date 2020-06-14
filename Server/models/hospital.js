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

const hospitalSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "Admin is required"], 
    },
    name: {
        type: String, 
        required: [true, "Name is required"], 
        minlength: 2
    },
    location: [location],

    phoneNumbers: { 
        type: [String],
        required: [true, "phone number is required"],
        validate: function (val) {
            if (val.length === 0) {
                throw new Error('Phone is required')
            } else {
                val.forEach((phone)=>{
                    if(phone.trim().length === 0) {
                        throw new Error('phone number can not be empty')
                    }
                    if(!phone.trim().match(/^(012|011|010|015)[0-9]{8}$/)) {
                        throw new Error('Invalid Phone Number')
                    }
                    if(val.filter((phoneItem)=> phoneItem === phone ).length !== 1) {
                        throw new Error('Phone Number must be unique.')
                    }
                })
            }
        }
    },

    maxTimeLimit:{
        type: Number,
        required:[true,'Max Time Limit  is required'],
        validate: function (val) {
            console.log(val)
            if(!val.toString().trim().match(/^[0-9]+$/) && val<0) {
                throw new Error('Time Limit must be a positive number')
            }
        }
    },

    regulations: {
        type: [String],
        validate: function (val) {
            val.forEach((regulation)=>{
                if(regulation.trim().length === 0) {
                    throw new Error('Regulation can not be empty')
                }
            })           
        }
    }
}, {
    timestamps: true,
})

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
