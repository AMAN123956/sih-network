const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		about:{
			type: String,
		},
		image:{
			type:String,
			default:'https://cdn.pixabay.com/photo/2017/11/30/09/03/business-2987962__480.jpg'
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		investors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Investor",
			},
		],
		conversations: [
			{
				id: {
					type: String,
				},
				chats: [
					{
						name: { type: String },
						message: { type: String },
						direction: { type: String },
						dateTime: { type: Date },
					},
				],

				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
