const {
	getChannel,
	addChannel,
	addChats,
	getChat,
} = require("../controllers/channel.controller");

const router = require("express").Router();

router.route("/:channelId").get(getChannel);
router.route("/").post(addChannel);
router.route("/add/:userID/:channelId").post(addChats);
router.route("/chat/:userID/:channelId").get(getChat);

module.exports = router;
