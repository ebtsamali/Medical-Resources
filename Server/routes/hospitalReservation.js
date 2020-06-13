const router = require('express').Router();
const hospitalReservationController = require('../controllers/hospitalReservation');
const { authJwt, checkHospitalReservation } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}


router.post('/:reservationId', [authJwt.verifyToken, authJwt.isHospital], hospitalReservationController.updateReservation);

router.post('/',  [authJwt.verifyToken, authJwt.isUser], hospitalReservationController.savePatientReservation);

router.get('/allReservations', [authJwt.verifyToken, authJwt.isHospital, checkHospitalReservation.checkHospitalReservation], hospitalReservationController.getHospitalReservations);


module.exports = router;