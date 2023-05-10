const { Router } = require("express");
const router = Router();

const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	getUserProfile,
	updatePassword,
	updateProfile,
	allUsers,
	getUserDetails,
	updateUser,
	deleteUser,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");
const { createProductReview } = require("../controllers/productControllers");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/logout").get(logoutUser);

router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizedRoles("admin"), allUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails);

router
	.route("/admin/user/:id")
	.put(isAuthenticatedUser, authorizedRoles("admin"), updateUser);

router
	.route("/admin/user/:id")
	.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
