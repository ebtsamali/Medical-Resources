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
