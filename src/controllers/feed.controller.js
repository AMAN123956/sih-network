const Feed = require("../models/Feeds");

const addFeed = async (req, res, next) => {
	try {
		const { type, value, image, entrepreneurId, investorId } = req.body;
		if (!type) {
			res.statusCode = 400;
			throw new Error("Missing field");
		}
		const feed = new Feed({
			type,
			value,
			image,
			entrepreneurId,
			investorId,
		});
		const savedFeed = await feed.save();
		res.send({
			success: true,
			data: feed,
		});
	} catch (e) {
		next(e);
	}
};

const deleteFeed = async (req, res, next) => {
	try {
		const { feedId } = req.params;
		const feed = await Feed.findById(feedId);
		if (!feed) {
			res.statusCode = 400;
			throw new Error("No such Feed");
		}
		await feed.remove();
		res.send({
			success: true,
		});
	} catch (e) {
		next(e);
	}
};

const getOneFeed = async (req, res, next) => {
	try {
		const { feedId } = req.params;
		const feed = await Feed.findById(feedId);
		if (!feed) {
			res.statusCode = 400;
			throw new Error("No such Feed");
		}
		res.send({
			success: true,
			data: feed,
		});
	} catch (e) {
		next(e);
	}
};

const getFeeds = async (req, res, next) => {
	try {
		const feeds = await Feed.find(req.query);
		res.send({
			success: true,
			data: feeds,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { addFeed, deleteFeed, getOneFeed, getFeeds };
