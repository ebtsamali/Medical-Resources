const USerModel = require('../models/user');

exports.checkAccountType = async (req, res, next) => {
    try {
        let user = await USerModel.findOne({email: req.body.email});

        if (user.type === 'facebook') {
            return res.send({message: "you can not change password"});
        }
        next();
    } catch (e) {
        console.log('inside middleware');
        res.status(500).send(e);
    }
}