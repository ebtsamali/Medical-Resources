const HospitalReservationModel = require('../models/hospitalReservation');

const savePatientReservation = async (req, res) => {
    const {
        body: {
            hospital,
            user,
            patientName,
            patientID,
            patientPhone,
            bed,
            timeLimit
        }
    } = req

    const reservation = new HospitalReservationModel({
        hospital,
        user,
        patientName,
        patientID,
        patientPhone,
        bed,
        timeLimit
    })

    try {
        await reservation.save();
        res.status(201).json({"message":"Reservation submitted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
}


// const applyReservationTimePolicy = async () => {
//     await HospitalReservationModel.find({status: "pending"})
//     .then((reservations)=> {
//         if(reservations.length !== 0){
//             reservations.map(reservation => {

//             })
//         }
//     }).catch(error => {
//         console.log(error);
//     })
// }


module.exports = {
    savePatientReservation
}