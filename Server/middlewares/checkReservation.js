const db = require("../models/index");
const Pharmacy = db.pharmacy;
const MedicineReservation = db.medicineReservation;

const checkReservationStatus = async (req, res, next) => {

    const { userId } = req;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId });
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }

        const reservations = await MedicineReservation.find({ pharmacy: pharmacy });
        reservations.forEach(async reservation => {
            let hoursDiff = (Date.now() - reservation.createdAt) / 36e5;
            if (hoursDiff > pharmacy.maxTimeLimit) {
                reservation.status = 'cancelled';
                await reservation.save();
            }
        });
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}


const verifyReservationStatus = {
    checkReservationStatus
}

module.exports = verifyReservationStatus