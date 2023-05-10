const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id,
	});

	res.status(200).json({
		success: true,
		order,
	});
});

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (!order) {
		return next(new ErrorHandler("Order does not exist", 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// Get logged in user orders => /api/v1/orders/me
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id });

	res.status(200).json({
		success: true,
		orders,
	});
});

// Get all orders => /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Update/process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("Ypu have already delivered this order", 400));
	}

	order.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.quantity);
	});

	order.orderStatus = req.body.status;
	order.deliveredAt = Date.now();

	res.status(200).json({
		success: true,
	});
});

const updateStock = async (id, quantity) => {
	const product = await Product.findById(id);
	product.stock = product.stock - quantity;
	await product.save({ validateBeforeSave: false });
};

// Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	await order.deleteOne();

	res.status(200).json({
		success: true,
		order,
	});
});
