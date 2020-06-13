const HospitalReservationModel = require('../models/hospitalReservation');
const BedModel = require('../models/bed');

const checkHospitalReservation= async (req, res, next) => {
    try {
        const reservations = await HospitalReservationModel.find({ status: "pending" });
        reservations.forEach(async reservation => {
            let hoursDiff = (Date.now() - reservation.createdAt) / 36e5;
            if ((hoursDiff > reservation.timeLimit) && (reservation.status !== "fulfilled") && (reservation.status !== "cancelled")) {
                reservation.status = 'cancelled';
                const bed = await BedModel.findById(reservation.bed._id);
                bed.reserved = false;
                await bed.save();
                await reservation.save();
            }
        });
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}


const verifyHospitalReservation = {
    checkHospitalReservation
}

module.exports = verifyHospitalReservation