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
            maxTimeLimit,
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
        maxTimeLimit,
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
    HospitalModel.findById(hospitalId)
        .then(hospital=>{
            hospital.adminId = req.body.adminId;
            hospital.name = req.body.name;
            hospital.location = {
                governorate: req.body.governorate,
                district: req.body.district,
                street: req.body.street
            };
            hospital.phoneNumbers = req.body.phoneNumbers;
            hospital.maxTimeLimit = req.body.maxTimeLimit;
            hospital.regulations = req.body.regulations;

            hospital.save()
                .then(()=>res.status(201).json({"message":"hospital updated successfully"}))
                .catch(err => res.status(500).send(err))
        })
        .catch(err => res.status(500).send(err))
}



module.exports = {
    saveHospitalData,
    getHospitalData,
    editHospitalData
}