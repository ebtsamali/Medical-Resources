const config = require('../config/auth');
const db = require('../models/index');
const User = db.user;
const nodemailer = require('nodemailer');
const passport = require('passport');
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signin = (req, res) => {

    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        //check password matching
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "invalid password"
            });
        }

        if (!user.activated) {
            return res.status(401).send({ message: "Unactivated Account." });
        }

        // assign the three parts ot the token
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800 //7 days in seconds [168 hours]
        });

        //send the  token and user data to the client
        res.status(200).send({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profileIsCompleted: user.profileIsCompleted,
            accessToken: token,
            accessTokenCreationDate: Date.now(),
            accessTokenTTL: 604800 //7 days in seconds [168 hours]
        })
    })
}


exports.signup = (req, res) => {
    const { body: { firstName, lastName, email, password, role } } = req;

    let newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role
    });

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // user
            pass: process.env.EMAIL_PASS, // password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    newUser.save().then(async () => {
        const emailToken = jwt.sign({ id: newUser._id }, process.env.EMAIL_SECRET, {
            expiresIn: 86400 //1 day in seconds [24 hours]
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `Medical Resources App <${process.env.EMAIL_USER}>`, // sender address
            to: newUser.email, // list of receivers
            subject: "Mail Activation", // Subject line
            text: `Pleased to have you in our system.\nPlease Activate your mail from this link: ${process.env.ACTIVATION_LINK}${emailToken}`, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        res.status(201).send({ newUser, message: "You Registered Successfully. Check your Email for Activation." });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({ message: err });
    });

}

exports.activateEmail = async (req, res) => {
    try {
        const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET, {
            expiresIn: 86400 //1 day in seconds [24 hours]
        });
        await User.updateOne({ _id: id }, { activated: true });
        res.status(200).send({ message: "Mail Activated Successfully. You can Login Now." })
    } catch (err) {
        res.status(400).send({ message: err });
    }
}

exports.forgetPassword = async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        const passwordResetToken = jwt.sign({ id: user._id }, process.env.PASSWORD_RESET_SECRET, {
            expiresIn: 86400 //1 day in seconds [24 hours]
        });
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // user
                pass: process.env.EMAIL_PASS, // password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: `Medical Resources App <${process.env.EMAIL_USER}>`, // sender address
            to: user.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            text: `As per your request to Reset your Password, please Reset your password from this link: ${process.env.PASSWORD_RESET_LINK}${passwordResetToken}`, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        res.status(200).send({ user, message: "Check your Email for Resetting your Password." });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
}

exports.updatePassword = async (req, res) => {

    try {
        const { id } = jwt.verify(req.params.token, process.env.PASSWORD_RESET_SECRET, {
            expiresIn: 86400 //1 day in seconds [24 hours]
        });

        let user = await User.findById(id);
        user.password = req.body.password;
        await user.save();
        res.status(200).send({ user, message: "Password has been Resetted Successfully. You can Login Now." });

    } catch (error) {
        res.status(400).send({ message: error });
    }
}

exports.loginWithGoogle = function (req, res) {
    const { user } = req
    let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 604800 //7 days in seconds [168 hours]
    });
    const result = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileIsCompleted: user.profileIsCompleted,
        accessToken: token,
        accessTokenCreationDate: Date.now(),
        accessTokenTTL: 604800 //7 days in seconds [168 hours]
    }
    res.redirect(`${process.env.FRONTEND_URL}/auth/google/success?user=${JSON.stringify(result)}`)

    //send the  token and user data to the client
    // res.status(200).send({
    //     id: user._id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     role: user.role,
    //     profileIsCompleted:user.profileIsCompleted,
    //     accessToken: token,
    //     accessTokenCreationDate: Date.now(),
    //     accessTokenTTL: 604800 //7 days in seconds [168 hours]
    // })
}
