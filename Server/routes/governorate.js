const express = require('express');
const router = express.Router();
const governorateController = require('../controllers/governorate');
// const { authJwt } = require("../middlewares");


// list all governorates
router.get('/', governorateController.getAllGovernorate)

module.exports = router;
