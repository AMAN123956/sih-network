const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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
	},
	{
		timestamps: true,
	}
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
