var socket = io();
let username = "";
const btn = document.getElementById('join-chat')

//for taking username input 
const usernameInput = document.getElementById('username-input')

// when username is entered, then after click chat app page should be opened
const usernameForm = document.querySelector(".form-username")

const chatroomContainer = document.querySelector(".chatroom-container")

const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
const messagesContainer = document.querySelector(".messages");



// to prevant all the default behavious of browser like without this it was getting refreshed now it will not 
btn.addEventListener('click', (event) => {
    event.preventDefault()
    username = usernameInput.value
        // console.log(username)
    if (username) {
        usernameForm.style.display = "none"
        chatroomContainer.style.display = "block"
    }
})

sendBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let data = {
        id: socket.id,
        username: username,
        message: messageInput.value,
    };
    socket.emit("secret message", data);
    appendMessage(data, "sent");
});

socket.on("secret message", (data) => {
    if (data.id !== socket.id) {
        appendMessage(data, "recieved");
    }
});

function appendMessage(data, type) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username} : ${data.message}`;
    if (type === "sent") {
        msgDiv.setAttribute("class", "message sent");
    } else {
        msgDiv.setAttribute("class", "message");
    }
    messagesContainer.append(msgDiv);
    messageInput.value = "";
}