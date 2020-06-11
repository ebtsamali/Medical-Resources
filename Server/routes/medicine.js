const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine');
const { authJwt, checkReservations } = require("../middlewares");


// adding new medicine
router.post('/',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.addMedicine)

// list all medicine
router.get('/',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.getAllMedicine)

// edit medicine
router.patch('/:id',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.updateMedicine)

// delete medicine
router.delete('/:id',[authJwt.verifyToken, authJwt.isPharmacy], medicineController.deleteMedicine)

// search for medicine
router.get('/search',[authJwt.verifyToken, authJwt.isUser], medicineController.search)

// get all medicine reservations
router.get('/reservations', [authJwt.verifyToken, authJwt.isPharmacy, checkReservations.checkReservationStatus], medicineController.getAllMedicineReservations);

module.exports = router;
