let express = require('express');
let router = express.Router();

const enthusiast_controller = require('../controllers/enthusiast.controllers');
router.post('/saveEnthusiast', enthusiast_controller.saveEnthusiast);
router.get('/enthusiastprofile/:emailId', enthusiast_controller.getEnthusiastByEmail);
router.put('/enthusiast/:emailId', enthusiast_controller.updateEnthusiastByEmail);

router.post('/enthusiastlogin',enthusiast_controller.enthusiastLogin);







module.exports = router;