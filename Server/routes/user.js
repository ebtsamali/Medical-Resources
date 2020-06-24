const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authJwt, userHomepage } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}


router.get("/:id", [authJwt.verifyToken], userController.getUser);
router.patch("/:id", [authJwt.verifyToken], userController.updateUser);
router.post("/cart", [], userController.getCart);
router.post("/:id/pharmacys/:pharmacy_id/reserve", [authJwt.verifyToken, authJwt.isUser], userController.reserveMidicine);
router.post("/:id/pharmacys/:pharmacy_id/order", [authJwt.verifyToken, authJwt.isUser], userController.orderMidicine);
router.get("/:id/medicines_reservation/:reservation_id", [authJwt.verifyToken, authJwt.isUser], userController.getReservationDetails);
router.get("/:id/medicines_order/:order_id", [authJwt.verifyToken, authJwt.isUser], userController.getOrderDetails);
router.get("/:id/orders", [authJwt.verifyToken, authJwt.isUser], userController.getAllUserOrders);
router.get("/:id/medicines", [authJwt.verifyToken, authJwt.isUser, userHomepage.checkMedicineReservationsStatus], userController.getAllUserMedicineReservations);
router.get("/:id/beds", [authJwt.verifyToken, authJwt.isUser, userHomepage.checkHospitalReservationsStatus], userController.getAllUserHospitalReservations);

module.exports = router;
