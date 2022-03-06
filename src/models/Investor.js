const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
		unique: true,
	},
	about: {
		type: String,

	},
	companyInvested: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
		},
	],
	walletAddressArray: [
		{
			type: String,
		},
	],
	mentor: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
		required: true,
	},
	industry: {
		type: String,
	},
	sector: {
		type: String,
	},
	stage: {
		type: String,
	},
	state: {
		type: String,
	},
	channels: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Channel",
		},
	],
});

investorSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

investorSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	this.password = await bcrypt.hash(this.password, salt);
});

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
