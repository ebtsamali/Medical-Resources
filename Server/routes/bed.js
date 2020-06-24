const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bed');
const { authJwt, checkHospitalReservation, verifyRoomNumber } = require("../middlewares");

// get all beds available for user
router.get('/allBeds', [checkHospitalReservation.checkHospitalReservation], bedController.getAllAvailableBeds);

// get all available beds of particular hospital for user
router.get('/:hospitalId', [checkHospitalReservation.checkHospitalReservation], bedController.getAllHospitalBeds);

//edit bed, req from user
router.patch('/edit/:id', [authJwt.verifyToken, authJwt.isUser], bedController.updateBed)

// adding new bed
router.post('/',[authJwt.verifyToken, authJwt.isHospital, verifyRoomNumber.checkDuplicatedRoomNum], bedController.addBed)

// // list all beds
router.get('/',[authJwt.verifyToken, authJwt.isHospital], bedController.getAllBeds)

// // edit bed
router.patch('/:id',[authJwt.verifyToken, authJwt.isHospital, verifyRoomNumber.checkDuplicatedRoomNum], bedController.updateBed)

// // delete bed
router.delete('/:id',[authJwt.verifyToken, authJwt.isHospital], bedController.deleteBed)



module.exports = router;
