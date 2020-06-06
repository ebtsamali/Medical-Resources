const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy');
const { authJwt } = require("../middlewares");

// exports.tokenMiddleware = function (req, res, next) {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
// }

// adding new pharmacy
router.post('/',[authJwt.verifyToken, authJwt.isPharmacy], pharmacyController.addPharmacy)

// get pharmacy data by admin id
router.get('/',[authJwt.verifyToken, authJwt.isPharmacy], pharmacyController.getPharmacyProfile)

// update pharmacy data
router.patch('/:id',[authJwt.verifyToken, authJwt.isPharmacy], pharmacyController.updatePharmacy)



module.exports = router;
