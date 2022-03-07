// const BASEURL = `https://internal-sih.herokuapp.com`;
const BASEURL = `http://localhost:5000`;

var io = io(`${BASEURL}`);
const URL = document.URL;

const splitURL1 = URL.split("/");
const splitURL2 = `${URL.split("?")[URL.split("?").length - 1]}`.split("=");

const senderID = splitURL1[splitURL1.indexOf("socket") + 2];
const senderType = splitURL1[splitURL1.indexOf("socket") + 1];

const inputBox = document.getElementById("input-box");
const sendButton = document.getElementById("send-button");
const messageBox = document.querySelector(".messagebox");

const createChatDiv = (message, direction, name, time) => {
	if (direction === "outgoing") {
		const messageDiv = document.createElement("div");
		const messageAtt = document.createAttribute("class");
		messageAtt.value = "message outgoing";
		messageDiv.setAttributeNode(messageAtt);
		messageDiv.innerText = message;

		const senderDiv = document.createElement("div");
		const senderAtt = document.createAttribute("class");
		senderAtt.value = "sender";
		senderDiv.setAttributeNode(senderAtt);
		senderDiv.innerText = `${moment(time).format("DD-MM-YYYY | hh:mm")}`;

		const div = document.createElement("div");
		const att = document.createAttribute("class");
		att.value = "message-container";
		div.setAttributeNode(att);
		div.appendChild(senderDiv);
		div.appendChild(messageDiv);
		messageBox.appendChild(div);
	}
	if (direction === "incomming") {
		const messageDiv = document.createElement("div");
		const messageAtt = document.createAttribute("class");
		messageAtt.value = "message incomming";
		messageDiv.setAttributeNode(messageAtt);
		messageDiv.innerText = message;

		const senderDiv = document.createElement("div");
		const senderAtt = document.createAttribute("class");
		senderAtt.value = "sender";
		senderDiv.setAttributeNode(senderAtt);
		senderDiv.innerText = `${name} ${moment(time).format(
			"DD-MM-YYYY | hh:mm"
		)}`;

		const div = document.createElement("div");
		const att = document.createAttribute("class");
		att.value = "message-container";
		div.setAttributeNode(att);
		div.appendChild(senderDiv);

		div.appendChild(messageDiv);

		messageBox.appendChild(div);
	}
	messageBox.scrollTo(0, messageBox.scrollHeight);
};

const loadHistoryMessage = async (senderID, roomId) => {
	try {
		const { data: chats } = await axios.get(
			`${BASEURL}/socket/getChat/${senderID}/${roomId}`
		);

		console.log(chats);

		chats.forEach((chat) => {
			createChatDiv(
				chat.message,
				`${chat.direction}`,
				chat.name,
				chat.dateTime
			);
		});
	} catch (e) {
		console.log(e);
	}
};

const loadRecentChats = async (senderID) => {
	try {
		const { data: recentChats } = await axios.get(
			`${BASEURL}/socket/getrecent/${senderID}`
		);
		console.log(recentChats);
		const recentChatContainer = document.querySelector('.recentChat')
		console.log(recentChatContainer)
		let data = '';
		recentChats.map(chat => {
			data += `<a href='${BASEURL}/'>
			<div class='userChat'>
			<img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" alt="user_img" />
			    <h2>${chat.name}</h2>
			</div>
			</a>`
			recentChatContainer.innerHTML += data;

		})
	} catch (e) {
		console.log(e);
	}
};

const getRoomId = (senderID, receiverID) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data: roomId } = await axios.get(
				`${BASEURL}/socket/getroomid/${senderID}/${receiverID}`
			);
			resolve(roomId);
		} catch (e) {
			reject(e);
		}
	});
};

const fn = async function () {
	try {
		if (splitURL2[0] === "entrepreneur" || splitURL2[0] === "investor") {
			const receiverType = splitURL2[0];
			const receiverID = splitURL2[1];
			const { data: user1 } = await axios.get(
				`${BASEURL}/api/${senderType}/${senderID}`
			);
			const { data: user2 } = await axios.get(
				`${BASEURL}/api/${receiverType}/${receiverID}`
			);

			const roomId = await getRoomId(senderID, receiverID);

			console.log(roomId);

			loadHistoryMessage(senderID, roomId);
			loadRecentChats(senderID);

			io.emit("u2u", { room: roomId });

			inputBox.addEventListener("keydown", async (e) => {
				if (e.key === "Enter") {
					const message = inputBox.value;
					if (message.trim().length > 0) {
						io.emit("chat", { msz: message });
						createChatDiv(
							message,
							"outgoing",
							user1?.data?.name,
							new Date()
						);
						inputBox.value = " ";

						await axios.post(
							`${BASEURL}/socket/addChat/${senderID}/${receiverID}/${roomId}`,
							{
								message,
								name: user1?.data.name,
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

					createChatDiv(
						message,
						"outgoing",
						user1?.data?.name,
						new Date()
					);
					inputBox.value = " ";

					await axios.post(
						`${BASEURL}/socket/addChat/${senderID}/${receiverID}/${roomId}`,
						{
							message,
							name: user1?.data.name,
							direction: "outgoing",
							dateTime: new Date(),
						}
					);
				}
			});

			io.on("rechat", async ({ msz }) => {
				if (msz.trim().length > 0) {
					createChatDiv(
						msz,
						"incomming",
						user2?.data.name,
						new Date()
					);
					await axios.post(
						`${BASEURL}/socket/addChat/${senderID}/${receiverID}/${roomId}`,
						{
							message: msz,
							name: user2?.data.name,
							direction: "incomming",
							dateTime: new Date(),
						}
					);
				}
			});
		} else if (splitURL2[0] === "channel") {
			const receiverType = splitURL2[0];
			const receiverID = splitURL2[1];
			const { data: user1 } = await axios.get(
				`${BASEURL}/api/${senderType}/${senderID}`
			);
			// console.log(user1);
			const { data: channel } = await axios.get(
				`${BASEURL}/api/channel/${receiverID}`
			);

			io.emit("u2c", { room: channel.data._id });

			inputBox.addEventListener("keydown", async (e) => {
				if (e.key === "Enter") {
					const message = inputBox.value;
					if (message.trim().length > 0) {
						io.emit("groupchat", {
							msz: message,
							name: user1?.data.name,
						});
						createChatDiv(
							message,
							"outgoing",
							user1?.data?.name,
							new Date()
						);
						inputBox.value = " ";
					}
				}
			});

			sendButton.addEventListener("click", async (e) => {
				e.preventDefault();
				const message = inputBox.value;
				if (message.trim().length > 0) {
					io.emit("groupchat", {
						msz: message,
						name: user1?.data.name,
					});

					createChatDiv(
						message,
						"outgoing",
						user1?.data?.name,
						new Date()
					);
					inputBox.value = " ";
				}
			});

			io.on("grouprechat", ({ msz, name }) => {
				createChatDiv(msz, "incomming", name, new Date());
			});
		}
		messageBox.scrollTo(0, messageBox.scrollHeight);
	} catch (e) {
		console.log(e);
	}
};

fn();
