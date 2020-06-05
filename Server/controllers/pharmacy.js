const Pharmacy = require('../models/pharmacy')

const addPharmacy = async (req,res) => {
    // console.log(req.body)
    const {userId} = req;
    const {body:{  name, location, phoneNumbers, delivery }} = req
    try {
        const pharmacy = await Pharmacy.create({admin_id:userId, name, location, phoneNumbers, delivery})
        res.status(201).send(pharmacy)
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e)
    }
}

const getPharmacyProfile = async (req, res) => {
    const {userId} = req;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId})
        if(!pharmacy) {
            res.status(404).end()
        }
        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    addPharmacy,
    getPharmacyProfile
}
