var express = require('express');
var router = express.Router();

const expert_controller = require('../controllers/expert.controllers')
// const login_controller = require('../controllers/login.controller')
router.post('/saveExpert', expert_controller.saveExpert);
router.get('/Expertprofile/:emailId', expert_controller.getExpertByEmail);
router.put('/Expert/:emailId', expert_controller.updateExpertByEmail);
router.post('/expertlogin',expert_controller.expertLogin);
router.get('/getAllExpert', expert_controller.getAllExpert);
router.post('/commet',expert_controller.saveCommet)


module.exports = router;