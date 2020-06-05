const mongoose = require('mongoose');

const location = new mongoose.Schema({
    governorate: {
        type: String,
        required: [true, "governorate is required"],
        lowercase:true
    },
    district: {
        type: String,
        required: [true, "district is required"],
        lowercase:true
    },
    street: {
        type: String,
        required: [true, "street is required"],
        lowercase:true
    }
})

const pharmacySchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        // unique: true
    },
    location: {
        type: [location],
        required: [true, 'Location is required'],
        validate: function (val) {
            if (val.length === 0) {
                throw new Error('Location is required')
            }
        }
    },

    phoneNumbers: {
        type: [String],
        required: [true, 'Phone is required'],
        validate: function (val) {
            console.log(val)
            if (val.length === 0) {
                throw new Error('Phone is required')
            } else {
                val.forEach((phone)=>{
                    if(phone.trim().length === 0) {
                        throw new Error('phone number can not be empty')
                    }
                    if(!phone.trim().match(/^[0-9]+$/)) {
                        throw new Error('phone number must contain numbers only')
                    }
                })
            }
        }
    },

    delivery: {
        type: Boolean,
        // required: [true, "Delivery service status is required"],
        default: false
    }
}, {
    timestamps: true,
})

pharmacySchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'admin_id') {
            next({
                errors: {
                    admin_id: 'user can create only one pharmacy',
                }
            });
        } /*else if(Object.keys(error.keyPattern)[0] === 'name') {
            next(new Error('name must be unique'));
        }*/
    } else {
        const keys = Object.keys(error.errors);
        console.log(keys)
        const errors = keys.reduce((acc,key)=>{
            return {
                ...acc,
                [key.split('.')[key.split('.').length - 1]]:error.errors[key].properties.message
            }
        },{})
        next({errors});
    }
})
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
