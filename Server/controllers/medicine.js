const Medicine = require('../models/medicine');
const Pharmacy = require('../models/pharmacy');

const addMedicine = async (req,res) => {
    const {userId} = req;
    const {body:{  name, price, quantity }} = req
    try {
        const pharmacy = await Pharmacy.findOne({admin_id:userId})
        if(!pharmacy) {
            return res.status(404).send({errors:{message:"Please Complete Your Profile"}})
        }
        const medicine = await Medicine.create({pharmacy:pharmacy._id,name, price, quantity})
        res.status(201).send(medicine)
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

const getAllMedicine = async (req,res) => {
    const {userId} = req;
    try {
        const pharmacy = await Pharmacy.findOne({admin_id:userId})
        if(!pharmacy) {
            return res.status(404).send({errors:{message:"Please Complete Your Profile"}})
        }
        const medicine = await Medicine.find({pharmacy:pharmacy._id})
        res.status(201).send(medicine)
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

module.exports = {
    addMedicine,
    getAllMedicine
}
