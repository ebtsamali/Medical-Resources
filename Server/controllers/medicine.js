const db = require('../models/index');
const Medicine = db.medicine;
const Pharmacy = db.pharmacy;
const MedicineReservations = db.medicineReservation;
const MedicineOrders = db.medicineOrder;

const addMedicine = async (req, res) => {
    const { userId } = req;
    const { body: { name, price, quantity } } = req
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId })
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }
        const medicine = await Medicine.create({ pharmacy: pharmacy._id, name, price, quantity })
        res.status(201).send(medicine)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getAllMedicine = async (req, res) => {
    const { userId } = req;
    const pages = {
        hasPrevious: false
    }
    if (req.query.page && req.query.page > 1) {
        pages.hasPrevious = true
    }
    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 13;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId })
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }
        const medicineCount = await Medicine.find({ pharmacy: pharmacy._id }).countDocuments()
        pages.hasNext = medicineCount > (page + 1) * limit;
        const medicines = await Medicine.find({ pharmacy: pharmacy._id }).limit(limit).skip(limit * page)
        res.status(201).send({ medicines, pages })
    } catch (e) {
        res.status(500).send(e)
    }
}

const updateMedicine = async (req, res) => {
    const { params: { id } } = req;
    const updatedKeys = Object.keys(req.body);
    try {
        const medicine = await Medicine.findOne({ _id: id })
        if (!medicine) {
            return res.status(404).end()
        }
        updatedKeys.forEach((key) => {
            if (key === 'pharmacy') {
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

const deleteMedicine = async (req, res) => {
    const { params: { id } } = req;
    try {
        const medicine = await Medicine.findByIdAndRemove(id)
        if (!medicine) {
            return res.status(404).end()
        }
        res.status(200).send(medicine)
    } catch (e) {
        res.status(500).end()
    }

}

const search = async (req, res) => {
    const q = req.query.q || ""
    const governorate = req.query.governorate || ""
    const district = req.query.district || ""
    const pages = {
        hasPrevious: false
    }
    if (req.query.page && req.query.page > 1) {
        pages.hasPrevious = true
    }
    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 5;
    try {
        if (!q) {
            const pharmacys = await Pharmacy.find({
                'location.0.governorate': { $regex: governorate, $options: "i" },
                'location.0.district': { $regex: district, $options: "i" }
            }).limit(limit).skip(limit * page);

            const pharmacyCount = await Pharmacy.find({
                'location.0.governorate': { $regex: governorate, $options: "i" },
                'location.0.district': { $regex: district, $options: "i" }
            }).countDocuments()
            pages.hasNext = pharmacyCount > (page + 1) * limit;
            return res.status(200).send({ pharmacys, pages })
        } else {
            const pharmacys = (await Pharmacy.find({
                'location.0.governorate': { $regex: governorate, $options: "i" },
                'location.0.district': { $regex: district, $options: "i" }
            }, {
                location: 0,
                name: 0,
                delivery: 0,
                admin_id: 0,
                maxTimeLimit: 0,
                createdAt: 0,
                phoneNumbers: 0,
                updatedAt: 0,
                __v: 0
            }).lean()).map((pharmacy) => {
                return pharmacy._id
            });
            const medicines = await Medicine.find({ name: { $regex: q, $options: "i" }, pharmacy: { $in: pharmacys } }).populate({
                path: 'pharmacy',
                model: 'Pharmacy',
                select: ['name', 'phoneNumbers', 'location', 'delivery']
            }).limit(limit).skip(limit * page);

            const medicinesCount = await Medicine.find({ name: { $regex: q, $options: "i" }, pharmacy: { $in: pharmacys } }).populate({
                path: 'pharmacy',
                model: 'Pharmacy',
                select: ['name', 'phoneNumbers', 'location', 'delivery']
            }).countDocuments()
            pages.hasNext = medicinesCount > (page + 1) * limit;
            return res.status(200).send({ pharmacys: medicines, pages })
        }
    } catch (e) {
        return res.status(500).send({ message: 'internal server error' })
    }
}

const getAllMedicineReservations = async (req, res) => {
    const { userId } = req;

    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId });
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }

        const reservations = await MedicineReservations.find({ pharmacy: pharmacy })
            .populate('user', 'firstName lastName phoneNumber')
            .populate('order.medicine', 'name')
        res.status(200).send({ reservations });
    } catch (err) {
        res.status(500).send(err);
    }
}

const getAllMedicineOrders = async (req, res) => {
    const { userId } = req;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId });
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }

        const orders = await MedicineOrders.find({ pharmacy: pharmacy })
            .populate('user', 'firstName lastName')
            .populate('order.medicine', 'name');
        res.status(200).send({ orders });
    } catch (err) {
        res.status(500).send(err);
    }
}

const changeOrderStatus = async (req, res) => {
    const { userId } = req;
    const orderId = req.params.id;
    const status = req.body.status;

    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId });
        if (!pharmacy) {
            return res.status(404).send({ errors: { message: "Please Complete Your Profile" } })
        }

        const order = await MedicineOrders.findOne({ _id: orderId, pharmacy: pharmacy });
        order.status = status;
        await order.save();
        res.status(200).send({ order, message: "Order Updated Successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    addMedicine,
    getAllMedicine,
    updateMedicine,
    deleteMedicine,
    search,
    getAllMedicineReservations,
    getAllMedicineOrders,
    changeOrderStatus
}
