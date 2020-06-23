const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { verifySignUp } = require("../middlewares/index");
const bodyParser = require("body-parser");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

router.post("/users/signup", verifySignUp.checkDuplicatedEmail, authController.signup);

router.post("/users/signin", authController.signin);

router.post("/users/facebookLogin", authController.facebookLogin);

exports.authRouter = router;
