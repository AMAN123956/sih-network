const Room = require("../models/Room");

const getRoom = async (req, res, next) => {
	try {
		const { user1: userID, user2: user2ID } = req.params;
		const preData1 = await Room.findOne({ user1: userID, user2: user2ID });
		const preData2 = await Room.findOne({ user2: userID, user1: user2ID });
		let roomId;
		if (preData1) {
			roomId = preData1._id;
		} else if (preData2) {
			roomId = preData2._id;
		} else {
			const data = new Room({
				user1: userID,
				user2: user2ID,
				user1Chat: { user: userID },
				user2Chat: { user: user2ID },
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
		const { message, direction, dateTime } = req.body;
		const { selfUser, secondUser, roomid } = req.params;
		// console.log(message, direction, dateTime, selfUser, secondUser);
		const room = await Room.findById(roomid).select(["-__v"]);
		if (room.user1Chat.user && room.user2Chat.user) {
			if (room.user1Chat.user === selfUser) {
				const chat = room.user1Chat.chat;
				chat.push({
					message,
					direction,
					dateTime,
				});
				room.user1Chat.chat = [...chat];
			}
			if (room.user2Chat.user === selfUser) {
				const chat = room.user2Chat.chat;
				chat.push({
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
		if (room.user1Chat.user === userId) {
			chat = room.user1Chat.chat;
		} else if (room.user2Chat.user === userId) {
			chat = room.user2Chat.chat;
		} else {
			chat = [];
		}
		res.send(chat);
	} catch (e) {
		console.log(e);
	}
};

module.exports = { getRoom, addChat, getChat };
