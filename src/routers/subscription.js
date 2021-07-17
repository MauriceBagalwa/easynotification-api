const controller = require('../controllers/subscription')
const { rechargeSMS } = require('../controllers/customer')
const email = require("../utils/email");
const router = require("express").Router();

router.get('/', controller.subscriptions)
router.post('/', controller.subscription, email.RechargeCountEmail)
router.post('/recharge', controller.rechargeCompte, rechargeSMS)

module.exports = router
