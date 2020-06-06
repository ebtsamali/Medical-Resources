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
    const pages = {
        hasPrevious: false
    }
    if (req.query.page && req.query.page > 1) {
        pages.hasPrevious = true
    }
    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 13;
    try {
        const pharmacy = await Pharmacy.findOne({admin_id:userId})
        if(!pharmacy) {
            return res.status(404).send({errors:{message:"Please Complete Your Profile"}})
        }
        const medicineCount = await Medicine.find({pharmacy:pharmacy._id}).countDocuments()
        pages.hasNext = medicineCount > (page + 1) * limit;
        const medicines = await Medicine.find({pharmacy:pharmacy._id}).limit(limit).skip(limit * page)
        res.status(201).send({medicines, pages})
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

const updateMedicine = async (req, res) => {
    const {params:{id}} = req;
    const updatedKeys = Object.keys(req.body);
    try {
        const medicine = await Medicine.findOne({_id:id})
        if(!medicine) {
            return res.status(404).end()
        }
        updatedKeys.forEach((key)=>{
            if(key === 'pharmacy') {
                return;
            }
            medicine[key] = req.body[key]
        })
        await medicine.save()
        res.status(200).send(medicine)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

}

const deleteMedicine = async (req,res) => {
    const {params:{id}} = req;
    try {
        const medicine = await Medicine.findByIdAndRemove(id)
        if(!medicine){
            return res.status(404).end()
        }
        res.status(200).send(medicine)
    } catch (e) {
        res.status(500).end()
    }

}



module.exports = {
    addMedicine,
    getAllMedicine,
    updateMedicine,
    deleteMedicine
}
