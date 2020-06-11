
const db = require('../models/index');
const User = db.user;
const Pharmacy = db.pharmacy;
const Medicine = db.medicine;
const MedicineReservation = db.medicineReservation;
const MedicineOrder = db.medicineOrder;

exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .exec((err, user)=>{
        if(err) {
            res.status(404).send({ message: "User Not Found" });
        } else {
            res.status(200).send(user);
        } 
    });
}

exports.updateUser = (req, res) => {
    const { body } = req;
    const updatedKeys = Object.keys(body);

    User.findById(req.userId, (err, instance) => { 
        if(err) return res.send(err);

        updatedKeys.forEach((info) => {
            if (key === 'user') {
                return;
            }
            instance[key] = req.body[key]
        });
        
        instance.profileIsCompleted = true;
        
        instance.save((err, user) => {
            if(err) {
                console.log(err);
                res.status(400).send({message: err});
            } else {
                res.status(201).send({user, message: "Profile Updated Successfully"});
            }
        })
    });
}

exports.getCart = async (req, res) => {
    const {body:{pharmacys}} = req
    const cart = []
    try {
        for (let i = 0; i<pharmacys.length;++i) {
            const pharmacy = await Pharmacy.findById(pharmacys[i].id);
            const item = {pharmacy,medicines:[]}
            for(let j=0;j<pharmacys[i].medicines.length;++j) {
                const medicine = await Medicine.findById(pharmacys[i].medicines[j])
                item.medicines.push(medicine)
            }
            cart.push(item)
        }
        res.status(200).send(cart)
    } catch (e) {
        res.status(500).end()
    }
}

exports.reserveMidicine = async (req, res) => {
    const {params:{id,pharmacy_id}} = req
    const {body:{totalPrice,order}} = req
    // console.log(req.body)
    try {
        const reservation = await MedicineReservation.create({totalPrice,order,pharmacy:pharmacy_id, user:id })
        for(let i = 0; i<order.length;++i) {
            const medicine = await Medicine.findById(order[i].medicine)
            medicine.quantity-=order[i].quantity
            await medicine.save()
        }
        res.send(reservation)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

exports.orderMidicine = async (req, res) => {
    const {params:{id,pharmacy_id}} = req
    const {body:{totalPrice,order, userAddress, userPhone}} = req
    console.log(req.body)
    try {
        const orderDetails = await MedicineOrder.create({totalPrice,order,pharmacy:pharmacy_id, user:id , userAddress, userPhone})
        for(let i = 0; i<order.length;++i) {
            const medicine = await Medicine.findById(order[i].medicine)
            medicine.quantity-=order[i].quantity
            await medicine.save()
        }
        res.send(orderDetails)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}
