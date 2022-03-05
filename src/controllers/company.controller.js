const Company = require("../models/Company");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res, next) => {
	try {
		const {
			name,
			companyNumber,
			about,
			documents,
			valuation,
			coFounders,
			walletAddressArray,
			voting,
			password,
		} = req.body;

		if (!name || !companyNumber || !about || !password) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}

		const preCompany = await Company.findOne({ companyNumber });
		if (preCompany) {
			res.statusCode = 400;
			throw new Error("Company already exist");
		}
		const company = new Company({
			name,
			companyNumber,
			about,
			documents,
			valuation,
			coFounders,
			walletAddressArray,
			voting,
			password,
		});
		res.status(200).send({
			success: true,
			data: {
				name,
				companyNumber,
				about,
				documents,
				valuation,
				coFounders,
				walletAddressArray,
				voting,
				password,
			},
		});
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const login = async (req, res, next) => {
	try {
		const { companyNumber, password } = req.body;
		if (!companyNumber || !password) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}
		const company = await Company.findOne({ companyNumber });
		if (!company && !(await company.matchPassword(password))) {
			res.statusCode = 400;
			throw new Error("Wrong company number or password");
		}
		const token = generateToken(company._id);
		res.status(200).send({
			success: true,
			data: {
				name: company.name,
				companyNumber,
				_id: company._id,
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
		const company = await Company.findById(id).select("-password");
		if (!company) {
			res.statusCode = 400;
			throw new Error("No such company");
		}
		res.send({
			success: true,
			data: company,
		});
	} catch (e) {
		next(e);
	}
};

const get = async (req, res, next) => {
	try {
		const QRY = req.query;
		const companies = await Company.find(QRY).select("-password");
		res.send({
			success: true,
			data: companies,
		});
	} catch (e) {
		next(e);
	}
};

const update = async (req, res, next) => {
	try {
		const company = req.company;
		const {
			name,
			about,
			documents,
			valuation,
			coFounders,
			walletAddressArray,
			voting,
			password,
		} = req.body;
		if (req.params.id !== company._id) {
			res.statusCode = 401;
			throw new Error("Not Authorised");
		}
		company.name = name || company.name;
		company.about = about || company.about;
		company.documents = documents || company.documents;
		company.valuation = valuation || company.valuation;
		company.coFounders = coFounders || company.coFounders;
		company.password = password || company.password;
		company.walletAddressArray =
			walletAddressArray || company.walletAddressArray;
		company.voting = voting || company.voting;
		await company.save();
		res.status(200).send({
			success: true,
			data: {
				name,
				about,
				documents,
				valuation,
				coFounders,
				walletAddressArray,
				voting,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { register, login, get, update, getOne };