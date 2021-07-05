const mobile = require('../controllers/submitMobile')
const router = require('express').Router()
const { referenceIsUse } = require('../utils/middleware')
/*
*Submit with mobile money
*/
router.get('/', mobile.submits);
router.post('/', referenceIsUse, mobile.submit, mobile.submits);
router.put('/', mobile.delete);