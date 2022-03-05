const router = require("express").Router();

const companyRouter = require("../routers/company.router");
const investorRouter = require("../routers/investor.router");
const userRouter = require("../routers/user.router");

const activateAPI = () => {
	router.use("/company", companyRouter);
	router.use("/investor", investorRouter);
	router.use("/user", userRouter);
	return router;
};

module.exports = { activateAPI };
