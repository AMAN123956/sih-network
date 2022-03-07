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

const getChat = async (req, res, next) => {
	try {
		const { userID, channelId } = req.params;
		const channel = await Channel.findById(channelId);

		const chats = channel.conversations.filter((con) => {
			return String(con.id) === String(userID);
		});
		const requiredChat = chats[0]?.chats || [];

		res.send(requiredChat);
	} catch (e) {
		console.log(e);
	}
};

const addChats = async (req, res, next) => {
	try {
		const { userID, channelId } = req.params;
		const { name, message, dateTime, direction } = req.body;
		const channel = await Channel.findById(channelId);

		const conversations = channel.conversations;

		let flag = false;
		for (let i = 0; i < conversations.length; i++) {
			if (String(conversations[i].id) === String(userID)) {
				conversations[i].chats.push({
					name,
					message,
					dateTime,
					direction,
				});
				flag = true;
			}
		}
		if (!flag) {
			conversations.push({
				id: userID,
				chats: [{ name, message, dateTime, direction }],
			});
		}

		channel.conversations = conversations;
		const savedChannel = await channel.save();
		res.send({});
	} catch (e) {
		console.log(e);
	}
};

module.exports = { addChannel, joinChannel, getChannel, getChat, addChats };
