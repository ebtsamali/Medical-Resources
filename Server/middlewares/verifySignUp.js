const db = require("../models/index");
const User = db.user

const checkDuplicatedEmail = (req, res, next) => {

    // Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    });

}


const verifySignUp = {
    checkDuplicatedEmail
}

module.exports = verifySignUp