const { Router } = require("express");
const { getProducts } = require("../controllers/productControllers");

const router = Router();

router.route("/products").get(getProducts);

module.exports = router;
