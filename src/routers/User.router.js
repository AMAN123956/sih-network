const {
	register,
	login,
	fetchDetails,
} = require("../controllers/user.controller");

const router = require("express").Router();
router.route("/").post(register);
router.route("/login").post(login);
router.route("/").get(fetchDetails);

module.exports = { router };
