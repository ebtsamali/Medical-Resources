const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { verifySignUp } = require("../middlewares/index");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

router.post(
    "/users/signup",
    [
        verifySignUp.checkDuplicatedEmail
    ],
    authController.signupUser
);

router.post("/users/signin", authController.signin);

module.exports = router;