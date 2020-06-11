const mongoose = require('mongoose');
// const db = require("./index");
// const Pharmacy = db.pharmacy;

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

const medicineReservationSchema = new mongoose.Schema({
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

    status: {
        type: String,
        enum: ['pending', 'cancelled'],
        default: 'pending'
    }
    // timeLimit: {
    //     type: Number,
    //     required: [true, "Time Limit is required"]
    // }
}, {
    timestamps: true,
});

// medicineReservationSchema.pre("find", async (next) => {
//     let reserv = this;
//     try {
//         const pharmacy = await Pharmacy.findOne({ _id: reserv.pharmacy });

//         if (!pharmacy) {
//             return next({
//                 errors: {
//                     message: "Pharmacy Not Found"
//                 }
//             });
//         }

//         let hoursDiff = (Date.now() - reserv.createdAt) / 36e5;
//         if (hoursDiff > pharmacy.maxTimeLimit) {
//             reserv.status = 'cancelled';
//             await reserv.save();
//         }
//     } catch (error) {
//         return next({
//             errors: {
//                 message: error
//             }
//         })
//     }
// });



const MedicineReservation = mongoose.model('MedicineReservation', medicineReservationSchema);

module.exports = MedicineReservation;
