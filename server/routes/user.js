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
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

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

module.exports = router;
