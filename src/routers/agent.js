const controller = require('../controllers/agents')
const middleware = require("../utils/middleware")
const router = require('express').Router()

router.get('/', controller.agents)
router.post('/', middleware.agentExist, controller.agent, controller.agents)
router.put('/', middleware.agentExist, controller.update)
router.delete('/', controller.delete)

module.exports = router