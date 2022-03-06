const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	user1: {
		type: String,
	},
	user2: {
		type: String,
	},
	user1Chat: {
		user: {
			type: String,
		},
		name: {
			type: String,
		},
		chat: [
			{
				name: {
					type: String,
				},
				direction: {
					type: String,
				},
				message: {
					type: String,
				},
				dateTime: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	user2Chat: {
		user: {
			type: String,
		},
		name: {
			type: String,
		},
		chat: [
			{
				name: {
					type: String,
				},
				direction: {
					type: String,
				},
				message: {
					type: String,
				},
				dateTime: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
