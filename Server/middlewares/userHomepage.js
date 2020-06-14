const db = require("../models/index");
const MedicineReservations = db.medicineReservation;
const HospitalReservations = db.hospitalReservation;

exports.checkMedicineReservationsStatus = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const reservations = await MedicineReservations.find({ user: userId }).populate('pharmacy').populate('order.medicine');;
        reservations.forEach(async reservation => {
            let hoursDiff = (Date.now() - reservation.createdAt) / 36e5;
            if ((hoursDiff > reservation.pharmacy.maxTimeLimit) && (reservation.status !== "fulfilled") && (reservation.status !== "cancelled")) {
                reservation.status = 'cancelled';
                reservation.order.forEach(async item => {
                    item.medicine.quantity += item.quantity;
                    await item.medicine.save();
                });
                await reservation.save();
            }
        });
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.checkHospitalReservationsStatus = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const reservations = await HospitalReservations.find({ user: userId }).populate('bed');
        reservations.forEach(async reservation => {
            let hoursDiff = (Date.now() - reservation.createdAt) / 36e5;
            if ((hoursDiff > reservation.timeLimit) && (reservation.status !== "fulfilled") && (reservation.status !== "cancelled")) {
                reservation.status = 'cancelled';
                reservation.bed.reserved = false;
                await reservation.bed.save();
                await reservation.save();
            }
        });
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}
