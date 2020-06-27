const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const checkReservations = require('./checkReservation');
const checkHospitalReservation = require('./checkHospitalReservation');
const userHomepage = require('./userHomepage');
const verifyRoomNumber = require('./verifyRoomNumber');
const CheckAccountType = require('./checkUserAccountType');

module.exports = {
    authJwt,
    verifySignUp,
    checkReservations,
    checkHospitalReservation,
    userHomepage,
    verifyRoomNumber,
    CheckAccountType
}