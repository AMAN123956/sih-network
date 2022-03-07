const Channel = require("../models/Channels");
const Investor = require("../models/Investor");
const User = require("../models/User");

const addChannel = async (req, res, next) => {
	try {
		const { name, users, investors } = req.body;
		const channel = new Channel({ name, users, investors });
		const savedChannel = await channel.save();
		res.send({
			success: true,
			data: savedChannel,
		});
	} catch (e) {
		next(e);
	}
};

const joinChannel = async (req, res, next) => {
	try {
		const { channelId, userId } = req.params;
		const channel = await Channel.findById(channelId);
		if (!channel) {
			res.statusCode = 400;
			throw new Error("No such channel exist");
		}
		const user = await User.findById(userId);
		const investor = await Investor.findById(userId);

		if (user) {
			channel.users = [...channel.users, userId];
			user.channels = [...user.channels, channelId];
			await channel.save();
			await user.save();
		} else if (investor) {
			channel.investors = [...channel.investors, userId];
			investor.channels = [...investor.channels, channelId];
			await channel.save();
			await investor.save();
		} else {
			res.statusCode = 400;
			throw new Error("No such investor or users");
		}
	} catch (e) {
		next(e);
	}
};

const getChannel = async (req, res, next) => {
	try {
		const { channelId } = req.params;
		const channel = await Channel.findById(channelId);
		res.send({
			success: true,
			data: channel,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { addChannel, joinChannel, getChannel };
