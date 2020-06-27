const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: 2
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minlength: 2
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error(`Email is not vaild.`);
                }
            },
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (value) {
                if (value.length < 8) {
                    throw new Error(`Password must be at least 8 symbols.`)
                }
            }
        }
    },

    image: { type: String },

    phoneNumber: {
        type: String,
        // required: [true, "phone number is required"]
    },

    address: {
        governorate: { type: String },
        district: { type: String },
        street: { type: String },
        blockNum: { type: String },
        flatNum: { type: String }
    },

    birthdate: {
        type: Date
    },

    role: {
        type: String,
        enum: ['user', 'pharmacy', 'hospital'],
        default: 'user'
    },

    profileIsCompleted:{
        type:Boolean,
        default: false
    },

    activated: {
        type: Boolean,
        default: false
    },
    userPosition: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    type: {
        type: String,
        enum: ['normal', 'facebook'],
        default: 'normal'
    },

}, {
    timestamps: true,
});


userSchema.statics.findOrCreate = async function (condition,user, cb) {
    const self = this
    console.log(user)
    try {
        const existedUser = await self.findOne(condition);
        if(existedUser) {
            cb(null,existedUser)
        } else {
            const newUser = await self.create({...user, password:process.env.DEFAULT_PASSWORD,activated:true});
            if(newUser)
                cb(null,newUser)
        }
    } catch (e) {
        console.log(e)
        cb(e,null)
    }

}

userSchema.pre('save', function (next) {
    let user = this;

    if (user.isNew || user.isModified('password')) {
        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            if (err) {
                console.log(err);
                return next("Cannot Add/Update User");
            } else {
                user.password = hash;
                next();
            }
        });
    }
    else {
        next();
    }
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'email') {
            next({
                errors: {
                    email: 'email must be unique',
                }
            });
        } /*else if(Object.keys(error.keyPattern)[0] === 'name') {
            next(new Error('name must be unique'));
        }*/
    } else {
        console.log(error)
        const keys = Object.keys(error.errors);
        const errors = keys.reduce((acc,key)=>{
            return {
                ...acc,
                [key.split('.')[key.split('.').length - 1]]:error.errors[key].properties.message
            }
        },{})
        next({errors});
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;
