const controller = require('../controllers/mumber')
const router = require('express').Router()

router.get('/', controller.members)
router.post('/', controller.mumber, controller.members)
router.put('/', controller.update)
router.delete('/', controller.delete)

module.exports = router