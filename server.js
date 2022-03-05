const express = require("express");
const morgan = require("morgan");
require("colors");
require("dotenv").config({ path: "./config/dev.env" });
const connectDB = require("./src/db/db");
const cors = require("cors");
const { router } = require("./src/routers/User.router");
const { activateAPI } = require("./src/api/api");
const { errorHandler } = require("./src/middleware/errorHandler");
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
connectDB()
	.then((conn) => {
		console.log(
			`Database connected on port ${conn?.connection?.port}`.cyan.bold
		);

		app.get("/", (req, res) => {
			res.send({
				message: `Server running on port ${PORT}`,
			});
		});

		app.use("/api", activateAPI());
		app.use(errorHandler);
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`.yellow.bold);
		});
	})
	.catch((e) => {
		console.log(`Error while connecting data base : ${e}`.red);
		process.exit(0);
	});
