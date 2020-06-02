
const db = require('../models/index');
const User = db.user;


exports.testContent = (req, res) => {
    
    res.status(200).send({message: "Test User Content"})

}
