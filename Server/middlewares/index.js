const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const checkReservations = require('./checkReservation');
const checkHospitalReservation = require('./checkHospitalReservation');

module.exports = {
    authJwt,
    verifySignUp,
    checkReservations,
    checkHospitalReservation
}