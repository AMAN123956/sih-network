const {
	register,
	login,
	getOne,
	get,
	update,
} = require("../controllers/company.controller");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/:id").get(getOne);
router.route("/").get(get);
router.route("/:id").put(protect, update);

module.exports = router;
