const { Router } = require("express");
const router = Router();

const {
	newOrder,
	getMyOrders,
	getSingleOrder,
	getAllOrders,
	deleteOrder,
	updateOrder,
} = require("../controllers/orderControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router
	.route("/admin/orders")
	.get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder);
router
	.route("/admin/order/:id")
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
