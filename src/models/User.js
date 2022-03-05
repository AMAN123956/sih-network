const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		image: {
			type: String,
		},
		tags: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			// enum: [
			// 	"Investors",
			// 	"Mentors",
			// 	"Accelerators",
			// 	"Corporates",
			// 	"Incubators",
			// ],
		},
		activated: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;