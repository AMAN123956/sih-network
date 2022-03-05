const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
	try {
		const { name, address, image, tags, type, password } = req.body;
		if (!name || !password || !type) {
			return res.status(400).send({
				success: false,
				error: "Missing fields",
			});
		}
		const user = new User({
			name,
			address,
			image,
			tags,
			type,
			password,
		});
		const preUser = await User.find({ name, type });
		if (preUser.length > 0) {
			return res.status(400).send({
				success: false,
				error: "Already exists",
			});
		}

		const savedUser = await user.save();
		res.status(200).send({
			success: true,
			data: savedUser,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			success: false,
			error: "Server error",
		});
	}
};

const login = async (req, res) => {
	try {
		const { name, type, password } = req.body;
		if (!name || !password || !type) {
			return res.status(400).send({
				success: false,
				error: "Missing fields",
			});
		}
		const user = await User.findOne({ name, type }).select("-__v");
		if (!user || !(await user.matchPassword(password))) {
			return res.status(400).send({
				success: false,
				error: "Wrong name or password",
			});
		}
		const token = generateToken(user._id);
		const data = JSON.parse(JSON.stringify(user));
		delete data.password;
		data["token"] = token;

		res.send({
			success: true,
			data,
		});
	} catch (e) {
		console.log(e);
		res.send({
			success: false,
			error: "Server error",
		});
	}
};

const fetchDetails = async (req, res) => {
	try {
		const filters = ["name", "type", "tags", "type", "activated"];
		const query = JSON.parse(JSON.stringify(req.query));
		for (let key in query) {
			if (!filters.includes(key)) delete query[key];
		}
		const user = await User.find(query).select(["-password", "-__v"]);
		res.status(200).send({
			success: true,
			data: user,
		});
	} catch (e) {
		return res.status(500).send({
			success: false,
			error: "Server error",
		});
	}
};

module.exports = { register, login, fetchDetails };
