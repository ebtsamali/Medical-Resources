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


router.get("/test/content", [authJwt.verifyToken, authJwt.isUser], userController.testContent);

module.exports = router;