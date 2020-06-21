
const db = require('../models/index');
const User = db.user;
const Pharmacy = db.pharmacy;
const Medicine = db.medicine;
const MedicineReservation = db.medicineReservation;
const MedicineOrder = db.medicineOrder;
const HospitalReservations = db.hospitalReservation;

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                res.status(404).send({ message: "User Not Found" });
            } else {
                res.status(200).send(user);
            }
        });
}

exports.updateUser = (req, res) => {
    let updatedInfo = {};
    const { body } = req;

    if (body.firstName) updatedInfo['firstName'] = body.firstName;
    if (body.lastName) updatedInfo['lastName'] = body.lastName;
    if (body.email) updatedInfo['email'] = body.email;
    if (body.password) updatedInfo['password'] = body.password;
    if (body.phoneNumber) updatedInfo['phoneNumber'] = body.phoneNumber;
    if (body.address) updatedInfo['address'] = body.address;
    if (body.birthdate) updatedInfo['birthdate'] = body.birthdate;

    User.findById(req.userId, (err, instance) => {
        if (err) return res.send(err);

        if (updatedInfo.firstName) instance.firstName = updatedInfo.firstName;
        if (updatedInfo.lastName) instance.lastName = updatedInfo.lastName;
        if (updatedInfo.email) instance.email = updatedInfo.email;
        if (updatedInfo.password) instance.password = updatedInfo.password;
        if (updatedInfo.phoneNumber) instance.phoneNumber = updatedInfo.phoneNumber;
        if (updatedInfo.address) instance.address = updatedInfo.address;
        if (updatedInfo.birthdate) instance.birthdate = updatedInfo.birthdate;

        instance.profileIsCompleted = true;

        instance.save((err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send({ message: err });
            } else {
                res.status(201).send({ user, message: "Profile Updated Successfully" });
            }
        })
    });
}

exports.getCart = async (req, res) => {
    const { body: { pharmacys } } = req
    const cart = []
    try {
        for (let i = 0; i < pharmacys.length; ++i) {
            const pharmacy = await Pharmacy.findById(pharmacys[i].id);
            const item = { pharmacy, medicines: [] }
            for (let j = 0; j < pharmacys[i].medicines.length; ++j) {
                const medicine = await Medicine.findById(pharmacys[i].medicines[j])
                item.medicines.push(medicine)
            }
            cart.push(item)
        }
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).send({ message: 'internal server error' })
    }
}

exports.reserveMidicine = async (req, res) => {
    const { params: { id, pharmacy_id } } = req
    const { body: { totalPrice, order } } = req
    try {
        const reservation = await MedicineReservation.create({ totalPrice, order, pharmacy: pharmacy_id, user: id })
        for (let i = 0; i < order.length; ++i) {
            const medicine = await Medicine.findById(order[i].medicine)
            medicine.quantity -= order[i].quantity
            await medicine.save()
        }
        res.send(reservation)
    } catch (e) {
        res.status(500).send({ message: 'internal server error' })
    }
}

exports.orderMidicine = async (req, res) => {
    const { params: { id, pharmacy_id } } = req
    const { body: { totalPrice, order, userAddress, userPhone } } = req
    // console.log(req.body)
    try {
        const orderDetails = await MedicineOrder.create({ totalPrice, order, pharmacy: pharmacy_id, user: id, userAddress, userPhone })
        for (let i = 0; i < order.length; ++i) {
            const medicine = await Medicine.findById(order[i].medicine)
            medicine.quantity -= order[i].quantity
            await medicine.save()
        }
        res.send(orderDetails)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}


exports.getReservationDetails = async (req, res) => {
    const { params: { id, reservation_id } } = req
    try {
        const reservation = await MedicineReservation.findOne({ _id: reservation_id, user: id }).populate({
            path: 'pharmacy',
            model: 'Pharmacy',
            select: ['location', 'name']
        }).populate({
            path: 'user',
            model: 'User',
            select: ['address', 'firstName', 'lastName', 'phoneNumber']
        }).populate({
            path: 'order.medicine',
            model: 'Medicine',
            select: ['name']
        })
        if (!reservation) {
            return res.status(404).end();
        }
        return res.status(200).send(reservation)
    } catch (e) {
        res.status(500).send({ message: 'internal server error' })
    }
}

exports.getOrderDetails = async (req, res) => {
    const { params: { id, order_id } } = req
    try {
        const order = await MedicineOrder.findOne({ _id: order_id, user: id }).populate({
            path: 'pharmacy',
            model: 'Pharmacy',
            select: ['location', 'name']
        }).populate({
            path: 'order.medicine',
            model: 'Medicine',
            select: ['name']
        }).populate({
            path: 'user',
            model: 'User',
            select: ['firstName', 'lastName']
        })
        if (!order) {
            return res.status(404).end();
        }
        return res.status(200).send(order)
    } catch (e) {
        res.status(500).send({ message: 'internal server error' })
    }
}

exports.getAllUserOrders = async (req, res) => {
    const userId = req.params.id;
    const pageNum = (req.query.page && parseInt(req.query.page) - 1) || 0;
    const recordsPerPage = 13;
    const pageProps = {
        hasPrev: (req.query.page && req.query.page > 1) ? true : false,
        hasNext: true,
    }
    try {

        const ordersCount = await MedicineOrder.find({ user: userId }).countDocuments();
        pageProps.hasNext = (ordersCount > (pageNum + 1) * recordsPerPage)
        const orders = await MedicineOrder.find({ user: userId }).limit(recordsPerPage).skip(recordsPerPage * pageNum).sort({ createdAt: 'desc' });
        res.status(200).send({ orders, pageProps });
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAllUserMedicineReservations = async (req, res) => {
    const userId = req.params.id;
    const pageNum = (req.query.page && parseInt(req.query.page) - 1) || 0;
    const recordsPerPage = 13;
    const pageProps = {
        hasPrev: (req.query.page && req.query.page > 1) ? true : false,
        hasNext: true,
    }
    try {

        const reservationsCount = await MedicineReservation.find({ user: userId }).countDocuments();
        pageProps.hasNext = (reservationsCount > (pageNum + 1) * recordsPerPage)
        const reservations = await MedicineReservation.find({ user: userId }).limit(recordsPerPage).skip(recordsPerPage * pageNum).sort({ createdAt: 'desc' });
        res.status(200).send({ reservations, pageProps });
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAllUserHospitalReservations = async (req, res) => {
    const userId = req.params.id;
    const pageNum = (req.query.page && parseInt(req.query.page) - 1) || 0;
    const recordsPerPage = 13;
    const pageProps = {
        hasPrev: (req.query.page && req.query.page > 1) ? true : false,
        hasNext: true,
    }
    try {

        const reservationsCount = await HospitalReservations.find({ user: userId }).countDocuments();
        pageProps.hasNext = (reservationsCount > (pageNum + 1) * recordsPerPage)
        const reservations = await HospitalReservations.find({ user: userId })
            .populate('bed', 'roomNumber dayCost')
            .populate('hospital', 'name')
            .limit(recordsPerPage).skip(recordsPerPage * pageNum).sort({ createdAt: 'desc' });
        res.status(200).send({ reservations, pageProps });
    } catch (err) {
        res.status(500).send(err);
    }
}
