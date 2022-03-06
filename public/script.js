var io = io("http://localhost:5000");
const URL = document.URL;

const splitURL1 = URL.split("/");
const splitURL2 = `${URL.split("?")[URL.split("?").length - 1]}`.split("=");

const userID = splitURL1[splitURL1.indexOf("user") + 1];

const inputBox = document.getElementById("input-box");
const sendButton = document.getElementById("send-button");
const messageBox = document.querySelector(".messagebox");

const createChatDiv = (message, direction) => {
	if (direction === "outgoing") {
		const messageDiv = document.createElement("div");
		const messageAtt = document.createAttribute("class");
		messageAtt.value = "message outgoing";
		messageDiv.setAttributeNode(messageAtt);
		messageDiv.innerText = message;

		const div = document.createElement("div");
		const att = document.createAttribute("class");
		att.value = "message-container";
		div.setAttributeNode(att);
		div.appendChild(messageDiv);

		messageBox.appendChild(div);
		console.log(messageBox.clientHeight);
		// messageBox.scrollTo(0, 1000);
	}
	if (direction === "incomming") {
		const messageDiv = document.createElement("div");
		const messageAtt = document.createAttribute("class");
		messageAtt.value = "message incomming";
		messageDiv.setAttributeNode(messageAtt);
		messageDiv.innerText = message;

		const div = document.createElement("div");
		const att = document.createAttribute("class");
		att.value = "message-container";
		div.setAttributeNode(att);
		div.appendChild(messageDiv);

		messageBox.appendChild(div);
		// messageBox.scrollTo(0, messageBox.clientHeight);
	}
	messageBox.scrollTo(0, messageBox.scrollHeight);
};

const fn = async function () {
	try {
		if (splitURL2[0] === "user") {
			let user2ID = splitURL2[1];
			const { data: user1 } = await axios.get(
				`http://localhost:5000/api/entrepreneur/${userID}`
			);

			const { data: user2 } = await axios.get(
				`http://localhost:5000/api/entrepreneur/${user2ID}`
			);

			const { data: roomId } = await axios.get(
				`http://localhost:5000/socket/getroomid/${userID}/${user2ID}`
			);

			const { data } = await axios.get(
				`http://localhost:5000/socket/getChat/${userID}/${roomId}`
			);

			data.forEach((chat) => {
				createChatDiv(chat.message, `${chat.direction}`);
			});

			inputBox.addEventListener("keydown", async (e) => {
				// e.preventDefault();
				if (e.key === "Enter") {
					const message = inputBox.value;
					if (message.trim().length > 0) {
						io.emit("chat", { msz: message });
						createChatDiv(message, "outgoing");
						inputBox.value = " ";

						await axios.post(
							`http://localhost:5000/socket/addChat/${userID}/${user2ID}/${roomId}`,
							{
								message,
								direction: "outgoing",
								dateTime: new Date(),
							}
						);
					}
				}
			});

			sendButton.addEventListener("click", async (e) => {
				e.preventDefault();
				const message = inputBox.value;
				if (message.trim().length > 0) {
					io.emit("chat", { msz: message });

					createChatDiv(message, "outgoing");
					inputBox.value = " ";

					await axios.post(
						`http://localhost:5000/socket/addChat/${userID}/${user2ID}/${roomId}`,
						{
							message,
							direction: "outgoing",
							dateTime: new Date(),
						}
					);
				}
			});

			io.emit("u2u", { room: roomId });
			io.on("rechat", async ({ msz }) => {
				if (msz.trim().length > 0) {
					createChatDiv(msz, "incomming");
					await axios.post(
						`http://localhost:5000/socket/addChat/${userID}/${user2ID}/${roomId}`,
						{
							message: msz,
							direction: "incomming",
							dateTime: new Date(),
						}
					);
				}
			});
			messageBox.scrollTo(0, messageBox.scrollHeight);
		}
	} catch (e) {
		console.log(e);
	}
};

fn();
