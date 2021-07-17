const mobile = require('../controllers/submitMobile')
const router = require('express').Router()
const { referenceIsUse } = require('../utils/middleware')
const { subscription } = require('../controllers/subscription')
const { RechargeCountEmail } = require("../utils/email");
/*
*Submit with mobile money
*/
router.get('/', mobile.submits);
router.get('/ressent', mobile.submit_);
router.post('/', referenceIsUse, mobile.submit, mobile.submits);
router.post('/active', mobile.active, subscription, RechargeCountEmail);
router.put('/', mobile.delete);

module.exports = router