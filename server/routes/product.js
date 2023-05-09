const { Router } = require("express");
const router = Router();
const {
	getProducts,
	createNewProduct,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
} = require("../controllers/productControllers");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, createNewProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("admin/product/:id").put(isAuthenticatedUser, updateSingleProduct);
router
	.route("admin/product/:id")
	.delete(isAuthenticatedUser, deleteSingleProduct);

module.exports = router;
