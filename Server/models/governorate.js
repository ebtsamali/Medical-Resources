const mongoose = require('mongoose');
const governorateSchema = new mongoose.Schema({
        name:{
            type:String,
            lowercase:true
        },
        districts:[{
            type: String,
            lowercase: true
        }]
})

const Governorate = mongoose.model('Governorate', governorateSchema);

module.exports = Governorate;

