const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy');
const { authJwt } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

// adding new pharmacy
router.post('/',[authJwt.verifyToken, authJwt.isPharmacy], pharmacyController.addPharmacy)
router.get('/',[authJwt.verifyToken], pharmacyController.getPharmacyProfile)

module.exports = router;
