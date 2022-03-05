const mongoose = require("mongoose");

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
		required: true,
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
