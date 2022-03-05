const Investor = require("../models/Investor");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res, next) => {
	try {
		const {
			name,
			number,
			about,
			companyInvested,
			walletAddressArray,
			password,
			industry,
			sector,
			stage,
			state,
		} = req.body;

		if (!name || !number || !password) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}

		const preInvestor = await Investor.findOne({ number });
		if (preInvestor) {
			res.statusCode = 400;
			throw new Error("Company already exist");
		}
		const investor = new Investor({
			name,
			number,
			about,
			companyInvested,
			walletAddressArray,
			password,
			industry,
			sector,
			stage,
			state,
		});
		await investor.save();
		res.status(200).send({
			success: true,
			data: {
				name,
				number,
				about,
				companyInvested,
				walletAddressArray,
				industry,
				sector,
				stage,
				state,
			},
		});
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const login = async (req, res, next) => {
	try {
		const { number, password } = req.body;
		if (!number || !password) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}
		const investor = await Investor.findOne({ number });
		if (!investor && !(await investor.matchPassword(password))) {
			res.statusCode = 400;
			throw new Error("Investor number or password");
		}
		const token = generateToken(investor._id);
		res.status(200).send({
			success: true,
			data: {
				name: investor.name,
				number,
				_id: investor._id,
				token,
			},
		});
	} catch (e) {
		next(e);
	}
};

const getOne = async (req, res, next) => {
	try {
		const { id } = req.params;
		const investor = await Investor.findById(id).select("-password");
		if (!investor) {
			res.statusCode = 400;
			throw new Error("No such investor");
		}
		res.send({
			success: true,
			data: investor,
		});
	} catch (e) {
		next(e);
	}
};

const get = async (req, res, next) => {
	try {
		const QRY = req.query;
		const investors = await Investor.find(QRY).select("-password");
		res.send({
			success: true,
			data: investors,
		});
	} catch (e) {
		next(e);
	}
};

const update = async (req, res, next) => {
	try {
		const investor = req.investor;
		const {
			name,
			number,
			about,
			companyInvested,
			walletAddressArray,
			password,
			industry,
			sector,
			stage,
			state,
		} = req.body;
		if (req.params.id !== company._id) {
			res.statusCode = 401;
			throw new Error("Not Authorised");
		}

		if (await Investor.findOne({ number })) {
			res.statusCode = 400;
			throw new Error("Number already exist");
		}

		investor.name = name || investor.name;
		investor.number = number || investor.number;
		investor.about = about || investor.about;
		investor.password = password || investor.password;
		investor.walletAddressArray =
			walletAddressArray || investor.walletAddressArray;
		investor.companyInvested = companyInvested || investor.companyInvested;
		investor.industry = industry || investor.industry;
		investor.sector = sector || investor.sector;
		investor.stage = stage || investor.stage;
		investor.state = state || investor.state;

		await investor.save();
		res.status(200).send({
			success: true,
			data: {
				name,
				number,
				about,
				companyInvested,
				walletAddressArray,
				industry,
				sector,
				stage,
				state,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { register, login, get, update, getOne };
