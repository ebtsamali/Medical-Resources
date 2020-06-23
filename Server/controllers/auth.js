const config = require('../config/auth');
const db = require('../models/index');
const User = db.user;
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
            profileIsCompleted:user.profileIsCompleted,
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

    newUser.save().then(() => {
        res.status(201).send({newUser, message: "You Registered Successfully. You can Login Now."});
    }).catch((err) => {
        res.status(400).send({message: err});
    });

}

exports.loginWithGoogle = function(req, res) {
    const {user} = req
    let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 604800 //7 days in seconds [168 hours]
    });
    const result = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileIsCompleted:user.profileIsCompleted,
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
