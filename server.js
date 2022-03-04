const express = require("express");
const morgan = require("morgan");
require("colors");
require("dotenv").config({ path: "./config/dev.env" });
const connectDB = require("./src/db/db");
const cors = require("cors");
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));


app.listen(PORT, () => {
	console.log(`Server running on the port ${PORT}`.yellow);
});
