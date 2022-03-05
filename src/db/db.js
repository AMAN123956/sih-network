const mongoose = require("mongoose");
require("dotenv").config({ path: "dev.env" });

const connectDB = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const conn = await mongoose.connect(process.env.MONGODB_URI, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			});
			resolve(conn);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = connectDB;
