const router = require("express").Router();
const roomRouter = require("../routers/room.router");
const activateSocketAPI = () => {
	router.use("/socket", roomRouter);
	return router;
};

module.exports = { activateSocketAPI };
