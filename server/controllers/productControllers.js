const Product = require("../models/productModel");

// Create new Product => /api/v1/product/new
exports.createNewProduct = async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
};

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
	const products = await Product.find();

	res.status(200).json({
		success: true,
		message: "This route will show all the products in database",
	});
};

// Get a product => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	res.status(200).json({
		success: true,
		product,
	});
};

// Update a single product => /api/v1/product/:id
exports.updateSingleProduct = async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: true,
	});

	res.status(200).json({
		success: true,
		product,
	});
};

// Delete a product => /api/v1/product/:id
exports.deleteSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	await product.remove();

	res.status(200).json({
		success: true,
		message: "Product is deleted",
	});
};
