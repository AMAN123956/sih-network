const {
	getRoom,
	addChat,
	getChat,
	recent,
} = require("../controllers/room.controller");

const router = require("express").Router();

router.route("/getroomid/:user1/:user2").get(getRoom);
router.route("/addChat/:selfUser/:secondUser/:roomid").post(addChat);
router.route("/getChat/:userId/:roomid").get(getChat);
router.route("/get/:userId").get(recent);

module.exports = router;
