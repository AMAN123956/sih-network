const router = require("express").Router();

const companyRouter = require("../routers/company.router");
const investorRouter = require("../routers/investor.router");
const userRouter = require("../routers/User.router");
const feedRouter = require("../routers/feed.router");
const channelRouter = require("../routers/channel.router");

const activateAPI = () => {
	router.use("/startup", companyRouter);
	router.use("/investor", investorRouter);
	router.use("/entrepreneur", userRouter);
	router.use("/feed", feedRouter);
	router.use("/channel", channelRouter);
	return router;
};

module.exports = { activateAPI };
