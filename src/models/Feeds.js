const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
	{
		type: {
			type: String,
		},
		entrepreneur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		investor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Investor",
		},
		value: {
			type: String,
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
