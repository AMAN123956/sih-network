const { getChannel, addChannel } = require("../controllers/channel.controller");

const router = require("express").Router();

router.route("/:channelId").get(getChannel);
router.route("/").post(addChannel);

module.exports = router;
