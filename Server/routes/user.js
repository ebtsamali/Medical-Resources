const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authJwt } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}


router.get("/:id", [authJwt.verifyToken], userController.getUser);
router.patch("/:id", [authJwt.verifyToken], userController.updateUser);
router.post("/cart", [authJwt.verifyToken, authJwt.isUser], userController.getCart);
router.post("/:id/pharmacys/:pharmacy_id/reserve", [authJwt.verifyToken, authJwt.isUser], userController.reserveMidicine);
router.post("/:id/pharmacys/:pharmacy_id/order", [authJwt.verifyToken, authJwt.isUser], userController.orderMidicine);
module.exports = router;
