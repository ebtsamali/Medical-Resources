const router = require('express').Router();
const hospitalReservationController = require('../controllers/hospitalReservation');
const { authJwt } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

router.post('/',  [authJwt.verifyToken, authJwt.isUser], hospitalReservationController.savePatientReservation);

module.exports = router;