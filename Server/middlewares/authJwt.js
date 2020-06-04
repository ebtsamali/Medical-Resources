const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const db = require("../models/index")
const User = db.user

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {

        return res.status(403).send({ message: "No Token Provided" })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.userId = decoded.id        
        next();
    })
}

const isUser = (req, res, next) => {
    
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        } else {
            let error = 1;
            if(user.role === "user") {
                error = 0;
                next();
                return
            }

            if(error) res.status(403).send({ message: "Require User Role!" });
        }
    })
}

const isPharmacy = (req, res, next) => {
    
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        } else {
            let error = 1;
            if(user.role === "pharmacy") {
                error = 0;
                next();
                return
            }

            if(error) res.status(403).send({ message: "Require Pharmacy Role!" });
        }
    })
}

const isHospital = (req, res, next) => {
    
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        } else {
            let error = 1;
            if(user.role === "hospital") {
                error = 0;
                next();
                return
            }

            if(error) res.status(403).send({ message: "Require Hospital Role!" });
        }
    })
}

const authJwt = {
    verifyToken,
    isUser,
    isPharmacy,
    isHospital
}

module.exports = authJwt
