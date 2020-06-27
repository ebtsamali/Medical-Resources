const db = require('../models/index');
const User = db.user;
const Pharmacy = db.pharmacy;

const addPharmacy = async (req, res) => {
    const { userId } = req;
    const { body: { name, location, phoneNumbers, delivery, maxTimeLimit, workingHours } } = req
    // console.log(workingHours)
    try {
        const pharmacy = await Pharmacy.create({
            admin_id: userId,
            name,
            location,
            phoneNumbers,
            delivery,
            maxTimeLimit,
            workingHours
        })
        await User.findByIdAndUpdate(userId, { profileIsCompleted: true })
        res.status(201).send(pharmacy)
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

/*const createPharmacy = async (req, res) => {
    // const {userId} = req;
    const {body: {adminFirstName,adminLastName,adminEmail,adminPassword,pharmacyName, pharmacyLocation, phoneNumbers, delivery, maxTimeLimit, workingHours}} = req
    // console.log(workingHours)
    const session = await User.startSession();
    session.startTransaction();
    const opts = { session };
    try {
        const pharmacy = await Pharmacy.create({
            admin_id: userId,
            name:pharmacyName,
            location:pharmacyLocation,
            phoneNumbers,
            delivery,
            maxTimeLimit,
            workingHours
        })
        await User.findByIdAndUpdate(userId, {profileIsCompleted: true})
        await session.commitTransaction();
        session.endSession();
        res.status(201).send(pharmacy)
    } catch (e) {
        // console.log(e.message)
        await session.abortTransaction();
        session.endSession();
        res.status(500).send(e)
    }
}*/

const getPharmacyProfile = async (req, res) => {
    const { params: { id } } = req;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: id })
        if (!pharmacy) {
            return res.status(404).end()
        }

        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'internal server error' })
    }
}

const updatePharmacy = async (req, res) => {
    const { params: { id } } = req;
    const { userId } = req;
    // const {body:{  name, location, phoneNumbers, delivery }} = req
    const updatedKeys = Object.keys(req.body);
    try {
        const pharmacy = await Pharmacy.findOne({ _id: id, admin_id: userId })
        if (!pharmacy) {
            return res.status(404).end()
        }
        updatedKeys.forEach((key) => {
            if (key === 'admin_id') {
                return;
            }
            pharmacy[key] = req.body[key]
        })
        await pharmacy.save()
        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

}

const getPharmacyData = async (req, res) => {
    const { params: { id } } = req;
    try {
        const pharmacy = await Pharmacy.findById(id)
        if (!pharmacy) {
            return res.status(404).end()
        }
        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'internal server error' })
    }
}

const updatePharmacyRating = async (req, res) => {
    const { params: { pharmacyId } } = req;
    const { body: { userId, rating } } = req;
    let pharmacyRatingUpdated = false;

    try {
        let pharmacy = await Pharmacy.findOne({ _id: pharmacyId });
        pharmacy.ratings.forEach(async el => {
            if (el.userId == userId) {
                el.rating = rating;
                pharmacyRatingUpdated = true;
            }
        });
        if (!pharmacyRatingUpdated) {
            pharmacy.ratings.push({ userId, rating });
        }
        await pharmacy.save();
        res.status(200).send({pharmacy, message: "Rating updated successfully."});
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    addPharmacy,
    getPharmacyProfile,
    updatePharmacy,
    getPharmacyData,
    updatePharmacyRating
}
