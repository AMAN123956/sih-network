const Investor = require("../models/Investor");
const Room = require("../models/Room");
const User = require("../models/User");

const getRoom = async (req, res, next) => {
	try {
		const { user1: userID, user2: user2ID } = req.params;
		const preData1 = await Room.findOne({ user1: userID, user2: user2ID });
		const preData2 = await Room.findOne({ user2: userID, user1: user2ID });
		const user1 = await User.findById(userID);
		const investor1 = await Investor.findById(userID);
		let name1 = user1?.name || investor1?.name;

		const user2 = await User.findById(user2ID);
		const investor2 = await Investor.findById(user2ID);
		let name2 = user2?.name || investor2?.name;

		let roomId;
		if (preData1) {
			roomId = preData1._id;
		} else if (preData2) {
			roomId = preData2._id;
		} else {
			const data = new Room({
				user1: userID,
				user2: user2ID,
				user1Chat: { user: userID, name: name1 },
				user2Chat: { user: user2ID, name: name2 },
			});
			const savedData = await data.save();
			roomId = savedData._id;
		}
		res.send(roomId);
	} catch (e) {
		console.log(e);
	}
};

const addChat = async (req, res) => {
	try {
		const { message, direction, dateTime, name } = req.body;
		const { selfUser, secondUser, roomid } = req.params;
		// console.log(message, direction, dateTime, selfUser, secondUser);
		const room = await Room.findById(roomid).select(["-__v"]);
		if (room.user1Chat.user && room.user2Chat.user) {
			if (room.user1Chat.user === selfUser) {
				const chat = room.user1Chat.chat;
				chat.push({
					name,
					message,
					direction,
					dateTime,
				});
				room.user1Chat.chat = [...chat];
			}
			if (room.user2Chat.user === selfUser) {
				const chat = room.user2Chat.chat;
				chat.push({
					name,
					message,
					direction,
					dateTime,
				});
				room.user2Chat.chat = [...chat];
			}
		}
		await room.save();
		res.send({});
	} catch (e) {
		console.log(e);
	}
};

const getChat = async (req, res) => {
	try {
		const { userId, roomid } = req.params;
		const room = await Room.findById(roomid).select(["-__v"]);
		let chat;
		if (room?.user1Chat?.user === userId) {
			chat = room?.user1Chat?.chat;
		} else if (room?.user2Chat?.user === userId) {
			chat = room?.user2Chat?.chat;
		} else {
			chat = [];
		}
		res.send(chat);
	} catch (e) {
		console.log(e);
	}
};

const recent = async (req, res) => {
	try {
		const { userId } = req.params;
		const recent1 = await Room.find({ user1: userId });
		const recentDetails1 = [];
		for (let i = 0; i < recent1.length; i++) {
			const investor = await Investor.findById(recent1[i].user2);
			if (investor) {
				recentDetails1.push({
					name: investor.name,
					image: investor.image,
					_id: investor._id,
					type: "investor",
					roomId: recent1[i]._id,
				});
			}
			const user = await User.findById(recent1[i].user2);
			if (user) {
				recentDetails1.push({
					name: user.name,
					image: user.image,

					_id: user._id,
					type: "entrepreneur",
					roomId: recent1[i]._id,
				});
			}
		}
		const recent2 = await Room.find({ user2: userId });
		const recentDetails2 = [];
		for (let i = 0; i < recent2.length; i++) {
			const investor = await Investor.findById(recent2[i].user1);
			if (investor) {
				recentDetails2.push({
					name: investor.name,
					image: investor.image,
					_id: investor._id,
					type: "investor",
					roomId: recent1[i]._id,
				});
			}
			const user = await User.findById(recent2[i].user1);
			if (user) {
				recentDetails2.push({
					image: user.image,
					name: user.name,
					_id: user._id,
					type: "entrepreneur",
					roomId: recent2[i]._id,
				});
			}
		}
		const recent = [...recentDetails1, ...recentDetails2];
		res.send(recent);
	} catch (e) {
		console.log(e);
	}
};

module.exports = { getRoom, addChat, getChat, recent };
