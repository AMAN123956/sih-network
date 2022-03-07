const {
	register,
	login,
	getOne,
	get,
	update,
	raiseFund,
	fundExecute,
} = require("../controllers/company.controller");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/:id").get(getOne);
router.route("/").get(get);
router.route("/:id").put(protect, update);
router.route("/raiseFund/:companyID").post(raiseFund);
router.route("/executeFund/:companyID/:investorID").post(fundExecute);

module.exports = router;
