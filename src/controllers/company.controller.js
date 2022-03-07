const Company = require("../models/Company");
const Investor = require("../models/Investor");
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
			industry,
			sector,
			stage,
			state,
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
			industry,
			sector,
			stage,
			state,
		});

		const savedCompany = await company.save();
		const token = generateToken(savedCompany._id);

		res.status(200).send({
			success: true,
			data: {
				id: savedCompany._id,
				name,
				companyNumber,
				about,
				documents,
				valuation,
				coFounders,
				walletAddressArray,
				voting,
				password,
				industry,
				sector,
				stage,
				state,
				token,
				userType: "startup",
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
				userType: "startup",
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
			userType: "startup",
		});
	} catch (e) {
		next(e);
	}
};

const get = async (req, res, next) => {
	try {
		const QRY = req.query;
		const companies = await Company.find(QRY).select("-password");
		console.log(companies);
		res.send({
			success: true,
			data: companies,
			userType: "startup",
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
			industry,
			sector,
			stage,
			state,
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
		company.industry = industry || company.industry;
		company.sector = sector || company.sector;
		company.stage = stage || company.stage;
		company.state = state || company.state;

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

const raiseFund = async (req, res, next) => {
	try {
		const { companyID } = req.params;

		const { round, amount, equity, companyWallet, about } = req.body;

		const company = await Company.findById(companyID);

		company.walletAddressArray = companyWallet;
		const recentFunding = company.recentFunding || [];
		const recentFund = {
			round,
			amount,
			about,
			equity,
			active: true,
		};
		recentFunding.push(recentFund);

		company.recentFunding = recentFunding;
		const savedCompany = await company.save();
		res.send(savedCompany);
	} catch (e) {
		next(e);
	}
};

const fundExecute = async (req, res, next) => {
	try {
		const { companyID, investorID } = req.params;
		const { round, amount, equity, companyWallet, investorWallet } =
			req.body;

		const company = await Company.findById(companyID);
		const investor = await Investor.findById(investorID);

		company.walletAddressArray = companyWallet;

		const funding = company.recentFunding || [];
		const newFunding = [];
		funding.forEach((fund) => {
			let obj = { ...fund };
			if (fund.round === round) {
				obj.investor = investorID;
				obj.active = false;
			}
			newFunding.push(obj);
		});
		company.recentFunding = newFunding;

		const savedCompany = await company.save();

		const companyInvest = {
			company: companyID,
			amount,
			equity,
			round,
		};

		const companyInvested = investor.companyInvested || [];
		companyInvested.push(companyInvest);
		investor.companyInvested = companyInvested;

		const savedInvestor = await investor.save();

		res.send(savedCompany);
	} catch (e) {
		next(e);
	}
};

module.exports = {
	register,
	login,
	get,
	update,
	getOne,
	raiseFund,
	fundExecute,
};
