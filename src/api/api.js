const router = require("express").Router();

const companyRouter = require("../routers/company.router");
const investorRouter = require("../routers/investor.router");

const activateAPI = () => {
	router.use("/company", companyRouter);
	router.use("/investor", investorRouter);
	return router;
};

module.exports = { activateAPI };
