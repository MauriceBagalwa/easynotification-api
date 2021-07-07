const controller = require('../controllers/functions')
const router = require('express').Router()
const middleware = require("../utils/middleware")

router.get('/', controller.functions)
router.post('/', middleware.functionExist, controller.function, controller.functions)
router.put('/', middleware.functionExist, controller.update)
router.delete('/', controller.delete)

module.exports = router