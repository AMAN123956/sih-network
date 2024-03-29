const BASEURL = `https://internal-sih.herokuapp.com`;
const CALLURL = "https://video-call-strike.herokuapp.com";
// const BASEURL = `http://localhost:5000`;
// const CALLURL = `http://localhost:3000`;

var io = io(`${BASEURL}`);
const URL = document.URL;

const splitURL1 = URL.split("/");
const splitURL2 = `${URL.split("?")[URL.split("?").length - 1]}`.split("=");

const senderID = splitURL1[splitURL1.indexOf("socket") + 2];
const senderType = splitURL1[splitURL1.indexOf("socket") + 1];

const inputBox = document.getElementById("input-box");
const sendButton = document.getElementById("send-button");
const callButton = document.getElementById("call-button");
const messageBox = document.querySelector(".messagebox");

const number = document.querySelector(".number");
const Name = document.querySelector(".name");
const aboutProfile = document.querySelector(".about-profile");

const createChatDiv = (message, direction, name, time) => {
	if (direction === "outgoing") {
		const messageDiv = document.createElement("div");
		const messageAtt = document.createAttribute("class");
		messageAtt.value = "message outgoing";
		messageDiv.setAttributeNode(messageAtt);
		messageDiv.innerText = message;

		const senderDiv = document.createElement("div");
		const senderAtt = document.createAttribute("class");
		senderAtt.value = "receiver";
		senderDiv.setAttributeNode(senderAtt);
		// senderDiv.innerText = `${moment(time).format("DD-MM-YYYY | hh:mm:A")}`;
		senderDiv.innerText = `${moment(time).format("hh:mm  a")}`;

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
		// senderDiv.innerText = `${name} ${moment(time).format(
		// 	"DD-MM-YYYY | hh:mm"
		// )}`;
		senderDiv.innerText = `${name}   ${moment(time).format(" hh:mm  a")}`;

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

const loadHistoryMessageChannel = async (senderID, receiverID) => {
	try {
		const { data: chats } = await axios.get(
			`${BASEURL}/api/channel/chat/${senderID}/${receiverID}`
		);
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

const loadRecentChats = async (senderID, user1) => {
	try {
		const { data: recentChats } = await axios.get(
			`${BASEURL}/socket/getrecent/${senderID}`
		);
		const recentChatContainer = document.querySelector(".recentChat");
		recentChatContainer.innerHTML = "";
		recentChatContainer.innerHTML = "";

		recentChats.map((chat) => {
			recentChatContainer.innerHTML += `<a  href='${BASEURL}/socket/${senderType}/${senderID}/?${chat.type}=${chat._id}'>
			<div class='userChat'>
			<img src=${chat.image} alt="user_img" />
			    <h2>${chat.name}</h2>
			</div>
			</a>`;
		});
		user1.data.channels.map((channel) => {
			recentChatContainer.innerHTML += `<a  href='${BASEURL}/socket/${senderType}/${senderID}/?channel=${channel._id}'>
			<div class='userChat'>
			<img src="${channel.image}" alt="user_img" />
			    <h2>#  ${channel.name}</h2>
			</div>
			</a>`;
		});
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

const loadProfile = async (userData) => {
	let userImage = document.getElementById("userImage");
	userImage.src = userData.image;
	if (userData.number) number.innerText = `${userData.number}`;
	Name.innerText = `${userData.name}`;
	aboutProfile.innerText = userData.about ? `${userData.about}` : "";
	let userList = document.getElementById("usersList");
	usersList.innerHTML = "";
	if (userData.users || userData.investors) {
		userList.innerHTML = '<p class="participantsText">Participants</p>';
	}
	if (userData.users) {
		userData.users.map((user) => {
			userList.innerHTML += `<a href='${BASEURL}/socket/${senderType}/${senderID}/?entrepreneur=${user._id}'><div class="userBox"><img src=${user.image} />
		<p>${user.name}</p></div></a>`;
		});
	}
	if (userData.investors) {
		userData.investors.map((user) => {
			userList.innerHTML += `<a href='${BASEURL}/socket/${senderType}/${senderID}/?investor=${user._id}'><div class="userBox"><img src=${user.image} />
			<p>${user.name}</p></div></a>`;
		});
	}
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

			loadProfile(user2.data);

			callButton.addEventListener("click", (e) => {
				e.preventDefault();
				window.location.replace(`${CALLURL}/${roomId}`);
			});

			loadHistoryMessage(senderID, roomId);
			loadRecentChats(senderID, user1);

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
			console.log(user1);
			const { data: channel } = await axios.get(
				`${BASEURL}/api/channel/${receiverID}`
			);

			callButton.addEventListener("click", (e) => {
				e.preventDefault();
				window.location.replace(`${CALLURL}/${receiverID}`);
			});

			loadRecentChats(senderID, user1);
			loadHistoryMessageChannel(senderID, receiverID);
			loadProfile(channel.data);
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

						await axios.post(
							`${BASEURL}/api/channel/add/${senderID}/${receiverID}`,
							{
								name: user1?.data.name,
								message,
								dateTime: new Date(),
								direction: "outgoing",
							}
						);
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
					await axios.post(
						`${BASEURL}/api/channel/add/${senderID}/${receiverID}`,
						{
							name: user1?.data.name,
							message,
							dateTime: new Date(),
							direction: "outgoing",
						}
					);
				}
			});

			io.on("grouprechat", async ({ msz, name }) => {
				createChatDiv(msz, "incomming", name, new Date());
				await axios.post(
					`${BASEURL}/api/channel/add/${senderID}/${receiverID}`,
					{
						name,
						message: msz,
						dateTime: new Date(),
						direction: "incomming",
					}
				);
			});
		}
		messageBox.scrollTo(0, messageBox.scrollHeight);
	} catch (e) {
		console.log(e);
	}
};

fn();
