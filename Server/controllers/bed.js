const db = require('../models/index');
const Bed = db.bed;
const Hospital = db.hospital;

// list all beds of a hospital
exports.getAllBeds = async (req, res) => {
    const {userId} = req;
    const pageNum = (req.query.page && parseInt(req.query.page) - 1) || 0;
    const recordsPerPage = 13;
    const pageProps = {
        hasPrev: (req.query.page && req.query.page > 1) ? true : false,
        hasNext: true,
    }
    try{
        const hospital = await Hospital.findOne({adminId: userId});
        if (!hospital) {
            return res.status(404).send({errors: {message: "Please Complete Your Profile"}})
        }
        const bedsCount = await Bed.find({hospital: hospital._id}).countDocuments();
        pageProps.hasNext = (bedsCount > (pageNum + 1)*recordsPerPage)
        const beds = await Bed.find({hospital: hospital._id}).limit(recordsPerPage).skip(recordsPerPage * pageNum);
        res.status(200).send({beds, pageProps});
    } catch(err) {
        res.status(500).send(err);
    }
}

// add new bed
exports.addBed = async (req, res) => {
    const {userId} = req;
    const {body: {roomNumber, dayCost, category}} = req
    let reservedStatus = false;
    if(req.body.reserved && (req.body.reserved !== reservedStatus)) {
        reservedStatus = true;
    }
    try {
        const hospital = await Hospital.findOne({adminId: userId});
        if (!hospital) {
            return res.status(404).send({errors: {message: "Please Complete Your Profile"}});
        }
        const bed = await Bed.create({hospital: hospital._id, roomNumber, dayCost, reserved: reservedStatus, category});
        res.status(201).send(bed);
    } catch (err) {
        res.status(500).send(err);
    }
}

// update one bed
exports.updateBed = async (req, res) => {
    const bedId = req.params.id
    const { body } = req
    const updatedInfo = Object.keys(body);
    try {
        const bed = await Bed.findOne({_id: bedId});
        if(!bed) {
            return res.status(404).send({errors: {message: "Bed Not Found"}});
        }
        updatedInfo.forEach(key => {
            if(key === "hospital" || key === "_id") {
                return;
            }
            bed[key] = body[key];
        });
        await bed.save();
        res.status(200).send({bed, message: "Bed Updated Successfully"});
    } catch (err) {
        res.status(500).send(err);
    }
}

// update one bed
exports.deleteBed = async (req, res) => {
    const bedId = req.params.id;
    try {
        const bed = await Bed.findOneAndRemove({_id: bedId});
        if(!bed) {
            return res.status(404).send({errors: {message: "Bed Not Found"}});
        }
        res.status(200).send({bed, message: "Bed Deleted Successfully"});
        
    } catch (err) {
        res.status(500).send(err);
    }
}


// get All Beds available by hospital id
exports.getAllHospitalBeds = async (req, res) => {
    const hospitalId = req.params.hospitalId;

    try {
        const beds = await Bed.find({hospital: hospitalId, reserved: false})
        if(!beds){
            return res.status(404).send({errors: {message: "Beds Not Found"}});
        }
        res.status(200).send(beds);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
}

exports.getAllAvailableBeds = async (req, res) => {
    try {
        const beds = await Bed.find({reserved: false})
        if(!beds){
            return res.status(404).send({errors: {message: "Beds Not Found"}});
        }
        res.status(200).send(beds);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
}

