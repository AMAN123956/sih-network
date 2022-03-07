const {
	addFeed,
	deleteFeed,
	getOneFeed,
	getFeeds,
} = require("../controllers/feed.controller");

const router = require("express").Router();

router.route("/").post(addFeed);
router.route("/:id").delete(deleteFeed);
router.route("/:id").get(getOneFeed);
router.route("/").get(getFeeds);

module.exports = router;
