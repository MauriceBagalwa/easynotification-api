const middleware = require('../middleware/group')
const router = require('express').Router();
const controller = require('../controllers/group')
const { deleteGroup } = require('../controllers/mumber')

router.get("/", controller.groups)
router.post("/", middleware.isExist, controller.group, controller.groups)
// router.post("/", controller._group)
router.put("/", middleware.isExist, controller.update)
router.delete("/", controller.delete, deleteGroup)

//#Mumbers 

router.put("/mumber", controller.mumber)

module.exports = router;