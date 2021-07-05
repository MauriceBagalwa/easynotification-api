const middleware = require('../middleware/group')
const router = require('express').Router();
const controller = require('../controllers/group')

router.get("/", controller.groups)
router.post("/", middleware.isExist, controller.group, middleware.groups)
router.put("/", middleware.isExist, controller.update)
router.delete("/", controller.delete)

//#Mumbers

router.put("/mumber", controller.mumber)

module.exports = router;