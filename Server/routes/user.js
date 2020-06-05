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
module.exports = router;