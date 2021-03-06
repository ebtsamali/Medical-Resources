const router = require('express').Router();
const hospitalController = require('../controllers/hospital');
const { authJwt } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

router.get('/profile/:hospitalId', hospitalController.getHospitalInfo);

router.get('/search', [authJwt.verifyToken, authJwt.isUser], hospitalController.hospitalSearch);

router.get('/', hospitalController.allHospitals);

router.post('/',  [authJwt.verifyToken, authJwt.isHospital], hospitalController.saveHospitalData);

router.get('/:id', [authJwt.verifyToken, authJwt.isHospital], hospitalController.getHospitalData );

router.patch('/:hospitalId',  [authJwt.verifyToken, authJwt.isHospital], hospitalController.editHospitalData);


module.exports = router;