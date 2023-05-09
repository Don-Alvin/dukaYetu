const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Register new user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "agdkcgakhckah",
			url: "sdkgcakgfilgaifgia",
		},
	});

	sendToken(user, 200, res);
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || password) {
		return next(new ErrorHandler("Please enter email and password"));
	}

	// Check if user exists
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	// Check if password is matches the user
	const passwordMatches = user.comparePassword(password);

	if (!passwordMatches) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	sendToken(user, 200, res);
});
