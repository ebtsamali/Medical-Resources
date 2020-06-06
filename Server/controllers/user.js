
const db = require('../models/index');
const User = db.user;

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
    let updatedInfo = { }; 
    const { body } = req;

    if(body.firstName) updatedInfo['firstName'] = body.firstName;
    if(body.lastName) updatedInfo['lastName'] = body.lastName;
    if(body.email) updatedInfo['email'] = body.email;
    // if(body.password) updatedInfo['password'] = body.password;
    if(body.phoneNumber) updatedInfo['phoneNumber'] = body.phoneNumber;
    if(body.address) updatedInfo['address'] = body.address;
    if(body.birthdate) updatedInfo['birthdate'] = body.birthdate;

    User.findById(req.userId, (err, instance) => { 
        if(err) return res.send(err);

        if(updatedInfo.firstName) instance.firstName = updatedInfo.firstName;
        if(updatedInfo.lastName) instance.lastName = updatedInfo.lastName;
        if(updatedInfo.email) instance.email = updatedInfo.email;
        // if(updatedInfo.password) instance.password = updatedInfo.password;
        if(updatedInfo.phoneNumber) instance.phoneNumber = updatedInfo.phoneNumber;
        if(updatedInfo.address) instance.address = updatedInfo.address;
        if(updatedInfo.birthdate) instance.birthdate = updatedInfo.birthdate;
        

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