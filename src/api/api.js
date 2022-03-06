const router = require("express").Router();

const companyRouter = require("../routers/company.router");
const investorRouter = require("../routers/investor.router");
const userRouter = require("../routers/User.router");

const activateAPI = () => {
	router.use("/startup", companyRouter);
	router.use("/investor", investorRouter);
	router.use("/entrepreneur", userRouter);
	return router;
};

module.exports = { activateAPI };
