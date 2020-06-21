const db = require("../models/index");
const Bed = db.bed

const checkDuplicatedRoomNum = (req, res, next) => {

    // Room Number
    Bed.findOne({
        roomNumber: req.body.roomNumber
    }).exec((err, bed) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        if (bed && bed._id != req.body._id) {
            res.status(400).send({ errors: { roomNumber: "Failed! Room Number is already exists!" } });
            return;
        }

        next();
    });

}


const verifyRoomNumber = {
    checkDuplicatedRoomNum
}

module.exports = verifyRoomNumber