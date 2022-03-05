const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const Investor = require("../models/Investor");
// const User = require("../models/userModel");

const protect = async (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			try {
				token = req.headers.authorization.split(" ")[1];
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				// req.user = await User.findById(decoded.id).select("-password");
				req.company = await Company.findById(decoded.id).select(
					"-password"
				);
				req.investor = await Investor.findById(decoded.id).select(
					"-password"
				);
				next();
			} catch (error) {
				console.error(error);
				throw new Error("Session Expired");
			}
		}
		if (!token) {
			throw new Error("Not authorized");
		}
	} catch (e) {
		console.log(e);
		let error = `${e}`.split(":");
		let message;
		if (error[0] === "Error") {
			message = error[1];
		} else {
			message = "Authorization Problem";
		}
		res.json({ success: false, error: message });
		res.status(401);
	}
};

module.exports = { protect };
