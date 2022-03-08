const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res, next) => {
	try {
		const {
			name,
			number,
			image,
			password,
			interest,
			industry,
			sector,
			about,
			stage,
			state,
		} = req.body;
		if (!name || !number || !password) {
			return res.status(400).send({
				success: false,
				error: "Missing fields",
			});
		}
		const user = new User({
			name,
			number,
			image,
			password,
			interest,
			about,
			industry,
			sector,
			stage,
			state,
		});
		const preUser = await User.findOne({ number });
		if (preUser) {
			res.statusCode = 400;
			throw new Error("Already exists");
		}

		const savedUser = await user.save();
		const token = generateToken(savedUser._id);

		res.status(200).send({
			success: true,
			data: {
				id: savedUser._id,
				userType: "entrepreneur",
				name,
				number,
				image,
				industry,
				sector,
				about,
				stage,
				state,
				token,
			},
		});
	} catch (e) {
		next(e);
	}
};

const login = async (req, res, next) => {
	try {
		const { number, password } = req.body;
		console.log(req.body);
		if (!number || !password) {
			return res.status(400).send({
				success: false,
				error: "Missing fields",
			});
		}
		const user = await User.findOne({ number }).select("-__v");
		if (!user || !(await user.matchPassword(password))) {
			res.statusCode = 400;
			console.log("thet===");
			throw new Error("Wrong number or password");
		}
		const token = generateToken(user._id);
		const data = JSON.parse(JSON.stringify(user));
		delete data.password;
		data["token"] = token;
		data["userType"] = "entrepreneur";

		res.send({
			success: true,
			data,
		});
	} catch (e) {
		next(e);
	}
};

const getOne = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id)
			.select("-password")
			.populate(["channels"]);
		if (!user) {
			res.statusCode = 400;
			throw new Error("No such user");
		}
		res.send({
			success: true,
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

const get = async (req, res, next) => {
	try {
		const QRY = req.query;
		console.log(QRY);
		const users = await User.find(QRY).select("-password");
		res.send({
			success: true,
			data: users,
		});
	} catch (e) {
		next(e);
	}
};

const update = async (req, res, next) => {
	try {
		const user = req.user;
		const {
			name,
			number,
			image,
			password,
			interest,
			industry,
			about,
			sector,
			stage,
			state,
		} = req.body;
		if (user._id !== req.params.id) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}

		const preUser = await User.findOne({ number });
		if (preUser) {
			res.statusCode = 400;
			throw new Error("Already exists");
		}

		user.name = name || user.name;
		user.number = number || user.number;
		user.image = image || user.image;
		user.password = password || user.password;
		user.industry = industry || user.industry;
		user.sector = sector || user.sector;
		user.stage = stage || user.stage;
		user.state = state || user.state;
		user.interest = interest || user.interest;
		user.about = about || user.about;

		await user.save();

		res.send({
			success: true,
			data: {
				name,
				number,
				image,
				interest,
				industry,
				sector,
				about,
				stage,
				state,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { register, login, getOne, get, update };
