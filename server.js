const express = require("express");
const morgan = require("morgan");
const http = require("http");
require("colors");
require("dotenv").config({ path: "./config/dev.env" });
const connectDB = require("./src/db/db");
const cors = require("cors");
const { Server } = require("socket.io");
const { activateAPI } = require("./src/api/api");
const { errorHandler } = require("./src/middleware/errorHandler");
const Room = require("./src/models/Room");
const { activateSocketAPI } = require("./src/api/socketapi");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// PORt
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);

app.use(activateSocketAPI());

io.on("connection", (socket) => {
	socket.on("u2u", ({ room }) => {
		socket.join(room);

		socket.on("chat", ({ msz }) => {
			socket.to(room).emit("rechat", { msz });
		});
	});
	socket.on("u2c", ({ room }) => {
		socket.join(room);

		socket.on("groupchat", ({ msz, name }) => {
			socket.broadcast.to(room).emit("grouprechat", { msz, name });
		});
	});
});

app.use(morgan("dev"));
connectDB()
	.then((conn) => {
		console.log(
			`Database connected on port ${conn?.connection?.port}`.cyan.bold
		);

		app.use("/socket/:type/:id", express.static("public"));

		app.use("/api", activateAPI());
		app.use(errorHandler);
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`.yellow.bold);
		});
	})
	.catch((e) => {
		console.log(`Error while connecting data base : ${e}`.red);
		process.exit(0);
	});
