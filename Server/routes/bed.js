const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bed');
const { authJwt, checkHospitalReservation } = require("../middlewares");

// get all beds for user
router.get('/:hospitalId', [authJwt.verifyToken, authJwt.isUser, checkHospitalReservation.checkHospitalReservation], bedController.getAllHospitalBeds);

//edit bed, req from user
router.patch('/edit/:id', [authJwt.verifyToken, authJwt.isUser], bedController.updateBed)

// adding new bed
router.post('/',[authJwt.verifyToken, authJwt.isHospital], bedController.addBed)

// // list all beds
router.get('/',[authJwt.verifyToken, authJwt.isHospital], bedController.getAllBeds)

// // edit bed
router.patch('/:id',[authJwt.verifyToken, authJwt.isHospital], bedController.updateBed)

// // delete bed
router.delete('/:id',[authJwt.verifyToken, authJwt.isHospital], bedController.deleteBed)



module.exports = router;
