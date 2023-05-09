const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new Product => /api/v1/admin/product/new
exports.createNewProduct = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const resultsPerPage = 4;
	const productCount = await Product.countDocuments();

	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultsPerPage);

	const products = await apiFeatures.query;

	res.status(200).json({
		success: true,
		count: products.length,
		productCount,
		products,
	});
});

// Get a product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// Update a single product => /api/v1/product/:id
exports.updateSingleProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
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
});

// Delete a product => /api/v1/product/:id
exports.deleteSingleProduct = catchAsyncErrors(async (req, res, next) => {
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
});
