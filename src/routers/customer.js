const controller = require("../controllers/customer");
const email = require("../utils/email");
const router = require("express").Router();
const middleware = require("../utils/middleware")

//#Get
router.get("/", controller.customers);
router.get("/singin", controller.signin)

//#Post
router.post("/", middleware.customerExist, controller.customer);
router.post("/activation", controller.activeCustomer);
router.post("/confirmation", controller.resendEmail, controller.info);
router.post("/resend", middleware.customerExist, controller.resendEmail, controller.info);

//#PUT
router.put("/", middleware.customerExist, controller.update);
router.put("/changepsswd", controller.changePassword);
router.put("/email", middleware.customerExist, controller.changeEmail, controller.info);


module.exports = router;