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
router.get('/search',[], medicineController.search)

// get all medicine reservations
router.get('/reservations', [authJwt.verifyToken, authJwt.isPharmacy, checkReservations.checkReservationStatus], medicineController.getAllMedicineReservations);

// get all medicine orders
router.get('/orders', [authJwt.verifyToken, authJwt.isPharmacy], medicineController.getAllMedicineOrders);

// change medicine order status
router.patch('/orders/:id', [authJwt.verifyToken, authJwt.isPharmacy], medicineController.changeOrderStatus);

// change medicine reservation status
router.patch('/reservations/:id', [authJwt.verifyToken, authJwt.isPharmacy], medicineController.changeReservationStatus);

module.exports = router;
