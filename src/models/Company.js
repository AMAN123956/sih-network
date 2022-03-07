const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Decimal128 } = require("mongodb");

const companySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	companyNumber: {
		type: String,
		required: true,
		unique: true,
	},
	about: {
		type: String,
	},
	documents: [
		{
			type: String,
		},
	],
	valuation: {
		type: String,
	},
	coFounders: [
		{
			type: String,
		},
	],
	walletAddressArray: [
		{
			type: String,
		},
	],

	voting: [
		{
			type: String,
		},
	],
	password: {
		type: String,
		required: true,
	},
	activated: {
		type: Boolean,
		default: false,
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
	recentFunding: [
		{
			round: {
				type: String,
			},
			amount: {
				type: Number,
			},
			equity: {
				type: String,
			},
			active: {
				type: Boolean,
			},
			about: {
				type: String,
			},
			investor: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Investor",
			},
			default: [],
		},
	],
});

companySchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

companySchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	this.password = await bcrypt.hash(this.password, salt);
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
