const { Router } = require("express");
const router = Router();

const { newOrder } = require("../controllers/orderControllers");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
