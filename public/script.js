const BASEURL = `https://internal-sih.herokuapp.com`;
// const BASEURL = `http://localhost:5000`;

var io = io(`${BASEURL}`);
const URL = document.URL;

const splitURL1 = URL.split("/");
const splitURL2 = `${URL.split("?")[URL.split("?").length - 1]}`.split("=");

const userID = splitURL1[splitURL1.indexOf("user") + 1];

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

const fn = async function () {
	try {
		if (splitURL2[0] === "user" || splitURL2[0] === "investor") {
			let user2ID = splitURL2[1];
			const { data: user1 } = await axios.get(
				`${BASEURL}/api/entrepreneur/${userID}`
			);
			const { data: user2 } = await axios.get(
				`${BASEURL}/api/entrepreneur/${user2ID}`
			);

			const { data: roomId } = await axios.get(
				`${BASEURL}/socket/getroomid/${userID}/${user2ID}`
			);

			const { data: chats } = await axios.get(
				`${BASEURL}/socket/getChat/${userID}/${roomId}`
			);

			const { data: recentChats } = await axios.get(
				`${BASEURL}/socket/getrecent/${userID}`
			);
			console.log(recentChats);
            let data = '';
			const recentChatContainer = document.getElementsByClassName('recentChat')
			recentChats.map(chat => {
				data+= `<div className='chatUser'>
				        ${chat.name}
				</div>`
				recentChatContainer.innerHTML+=data;
			} )
			chats.forEach((chat) => {
				createChatDiv(
					chat.message,
					`${chat.direction}`,
					chat.name,
					chat.dateTime
				);
			});

			inputBox.addEventListener("keydown", async (e) => {
				// e.preventDefault();
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
							`${BASEURL}/socket/addChat/${userID}/${user2ID}/${roomId}`,
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
						`${BASEURL}/socket/addChat/${userID}/${user2ID}/${roomId}`,
						{
							message,
							name: user1?.data.name,
							direction: "outgoing",
							dateTime: new Date(),
						}
					);
				}
			});

			io.emit("u2u", { room: roomId });
			io.on("rechat", async ({ msz }) => {
				if (msz.trim().length > 0) {
					createChatDiv(
						msz,
						"incomming",
						user2?.data.name,
						new Date()
					);
					await axios.post(
						`${BASEURL}/socket/addChat/${userID}/${user2ID}/${roomId}`,
						{
							message: msz,
							name: user2?.data.name,
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
