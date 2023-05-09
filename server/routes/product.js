const { Router } = require("express");
const router = Router();
const {
	getProducts,
	createNewProduct,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
} = require("../controllers/productControllers");

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router
	.route("/admin/product/new")
	.post(isAuthenticatedUser, authorizedRoles("admin"), createNewProduct);
router
	.route("admin/product/:id")
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateSingleProduct);
router
	.route("admin/product/:id")
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteSingleProduct);

module.exports = router;
