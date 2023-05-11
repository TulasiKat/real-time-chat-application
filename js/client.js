const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

var audio = new Audio("../ting.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");

  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);

  messageContainer.appendChild(messageElement);
  if (position == "left" || position == "center") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  if (name !== null) {
    append(`${name} joined the chat`, "center");
  }
});

socket.on("receive", (data) => {
  if (data.name !== null) {
    append(`${data.name} : ${data.message}`, "left");
  }
});

socket.on("leave", (name) => {
  if (name !== null) {
    append(`${name} left the chat`, "center");
  }
});
