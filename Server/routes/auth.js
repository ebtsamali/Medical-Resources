const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {verifySignUp} = require("../middlewares/index");
const passport = require('passport');

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.post("/users/signup", verifySignUp.checkDuplicatedEmail, authController.signup);

router.post("/users/signin", authController.signin);
router.get('/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), authController.loginWithGoogle);

router.get("/users/activation/:token", authController.activateEmail);

router.post("/users/facebookLogin", authController.facebookLogin);
router.get('/users/checkEmail/:email', authController.checkEmail);

exports.authRouter = router;
