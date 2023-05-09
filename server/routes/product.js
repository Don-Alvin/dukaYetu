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

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/admin/product/new").post(createNewProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("admin/product/:id").put(updateSingleProduct);
router.route("admin/product/:id").delete(deleteSingleProduct);

module.exports = router;
