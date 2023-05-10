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

// PRODUCT REVIEWS

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(r) => r.user.toString() === req.user._id.toString
	);

	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let fullRatings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	product.ratings = Math.round(fullRatings);

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

// Get product reviews => /api/v1/reviews
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	res.status(200).json({
		success: true,
		count: product.reviews.length,
		reviews: product.reviews,
	});
});

// Delete reviews => /api/v1/review/delete
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString()
	);

	const numOfReviews = reviews.length;

	const ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
	});
});
