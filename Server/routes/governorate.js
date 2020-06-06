const express = require('express');
const router = express.Router();
const governorateController = require('../controllers/governorate');
// const { authJwt } = require("../middlewares");


// list all medicine
router.get('/', governorateController.getAllGovernorate)

module.exports = router;
