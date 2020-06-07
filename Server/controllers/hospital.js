const HospitalModel = require('../models/hospital');

const saveHospitalData = async (req, res )=>{
    console.log("inside save function");
    
    const {
        body: {
            adminId,
            name,
            governorate,
            district,
            street,
            phoneNumbers,
            regulations
        }
    } = req

    const hospital = new HospitalModel({
        adminId,
        name,
        location: {
            governorate,
            district,
            street,
        },
        phoneNumbers,
        regulations
    })

    hospital.save(function (err) {
        if (!err) res.json({"message":"hospital added successfully"});
        else {
            res.status(500).send(err)
        };
    });

}

const getHospitalData = (req, res) => {
    const adminId = req.params.id;
    HospitalModel.find({adminId: adminId}).populate({
        path: 'adminId'
    })
    .then((hospital)=>{
        res.status(200).send(hospital); 
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error)
    })
}

const editHospitalData = (req, res)=>{
    const hospitalId = req.params.hospitalId;
    HospitalModel.findByIdAndUpdate(hospitalId, req.body)
    .then((hospital) => {
        res.status(200).json({"message":"hospital updated successfully"});
    }).catch((error) => {
        console.log(error);
        
        res.status(500).end();
    })
}



module.exports = {
    saveHospitalData,
    getHospitalData,
    editHospitalData
}