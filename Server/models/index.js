const db = {};

db.user = require("./user");
db.role = require("./hospital");
db.author= require("./hospitalReservation");
db.categories  = require("./medicine");
db.book= require("./medicineReservation");
db.booksRating= require("./pharmacy");
db.ROLES = ['user','pharmacy', 'hospital'];

module.exports = db;