const db = {};

db.user = require("./user");
db.hospital = require("./hospital");
db.hospitalReservation= require("./hospitalReservation");
db.medicine  = require("./medicine");
db.medicineReservation= require("./medicineReservation");
db.pharmacy= require("./pharmacy");
db.bed = require("./bed");
db.ROLES = ['user','pharmacy', 'hospital'];

module.exports = db;
