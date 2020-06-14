const HospitalModel = require('../models/hospital');
const UserModel = require('../models/user');

// get all hospital
const allHospitals = async (req, res) => {
    await HospitalModel.find()
    .then((hospitals)=>{
        if(hospitals.length === 0)
        {
            return res.status(404).send('No Hospitals Found');
        }
        res.status(200).send(hospitals);
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error)
    })
}


// filter by governorate or district or name
const hospitalSearch = async (req, res) => {
    let key = "";
    let value = "";
    if(req.query.governorate){   
        key = "location.governorate";
        value = req.query.governorate;
    } else if(req.query.district) {
        key = "location.district";
        value = req.query.district;
    } else {
        key = "name";
        value = req.query.name;
    }
    await HospitalModel.find({
        [key]: {
            $regex: value, 
            $options: "i"
        }
    }).populate({ path: 'adminId' })
    .then((hospitals)=>{
        if(hospitals.length === 0){
            return res.status(404).send('No Hospitals Found');
        }
        res.status(200).send(hospitals);
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error)
    })
   
}

const saveHospitalData = async (req, res )=>{

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

    try {
        await hospital.save();
        await UserModel.findByIdAndUpdate(adminId, {profileIsCompleted: true}); 
        res.json({"message":"hospital added successfully"});
    } catch (error) {
        res.status(500).send(error);
    }

    // hospital.save(function (err) {
    //     if (!err) res.json({"message":"hospital added successfully"});
    //     else {
    //         res.status(500).send(err)
    //     };
    // });

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

const getHospitalInfo = (req, res) => {
    const hospitalId = req.params.hospitalId;
    HospitalModel.findById(hospitalId).populate({
        path: 'adminId'
    })
    .then((hospital)=>{
        res.status(200).send(hospital); 
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error)
    })
}


module.exports = {
    saveHospitalData,
    getHospitalData,
    editHospitalData,
    hospitalSearch,
    allHospitals,
    getHospitalInfo
}