
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