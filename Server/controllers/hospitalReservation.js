const HospitalReservationModel = require('../models/hospitalReservation');

const savePatientReservation = async (req, res) => {
    const {
        body: {
            hospital,
            user,
            patientName,
            patientID,
            patientPhone,
            dayCost,
            timeLimit
        }
    } = req

    const reservation = new HospitalReservationModel({
        hospital,
        user,
        patientName,
        patientID,
        patientPhone,
        dayCost,
        timeLimit
    })

    try {
        await reservation.save();
        res.status(201).json({"message":"Reservation submitted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    savePatientReservation
}