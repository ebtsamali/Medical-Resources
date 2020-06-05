const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine');
const { authJwt } = require("../middlewares");


// adding new medicine
router.post('/',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.addMedicine)

// list all medicine
router.get('/',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.getAllMedicine)

module.exports = router;
