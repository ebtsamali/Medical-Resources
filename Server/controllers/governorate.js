const Governorate = require('../models/governorate');



const getAllGovernorate = async (req,res) => {
    try {
        const governorates = await Governorate.find({})
        res.status(200).send({governorates})
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

module.exports={
    getAllGovernorate
}
