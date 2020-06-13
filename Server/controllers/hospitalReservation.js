const HospitalReservationModel = require('../models/hospitalReservation');
const HospitalModel = require('../models/hospital');
const BedModel = require('../models/bed');

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


const getHospitalReservations = async (req, res) => {
    const {userId} = req;
    try{
        const hospital = await HospitalModel.findOne({adminId: userId});
        if (!hospital) {
            return res.status(404).send({errors: {message: "Please Complete Your Profile"}})
        }
        const reservations = await HospitalReservationModel.find({hospital: hospital._id})
        .populate({
            path: 'bed'
        })
        res.status(200).send(reservations);
    } catch(err) {
        res.status(500).send(err);
    }
}

const updateReservation = async (req, res) => {
    console.log(req.body);
    
    const { body } = req;
    const reservationId = req.params.reservationId;
    // try{
    //     await HospitalReservationModel.findByIdAndUpdate(reservationId, {...body})
    //     res.status(201).json({"message":"Reservation submitted successfully"});
    // } catch(err) {
    //     res.status(500).send(err);
    // }
    const updatedInfo = Object.keys(body);
    try {
        const reservation = await HospitalReservationModel.findOne({_id: reservationId});

        updatedInfo.forEach(key => {
            if(key === "hospital" || key === "_id") {
                return;
            }
            reservation[key] = body[key];
        });
        await reservation.save();
        res.status(200).json({"message": "Reservation Updated Successfully"});
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = {
    savePatientReservation,
    getHospitalReservations,
    updateReservation
}