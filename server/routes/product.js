const { Router } = require("express");
const {
	getProducts,
	createNewProduct,
	getSingleProduct,
	updateSingleProduct,
	deleteSingleProduct,
} = require("../controllers/productControllers");

const router = Router();

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(createNewProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("admin/product/:id").put(updateSingleProduct);
router.route("admin/product/:id").delete(deleteSingleProduct);

module.exports = router;
