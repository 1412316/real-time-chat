const socket = io();

const msgText = document.querySelector("#msg");
const btnSend = document.querySelector("#btn-send");
const chatBox = document.querySelector(".chat__message");
const displayMsg = document.querySelector(".message");

let name;
do {
  name = prompt("Create user name: ");
} while(!name);

document.querySelector('#your-name').textContent = name;
msgText.focus();

btnSend.addEventListener('click', e => {
  e.preventDefault();
  sendMsg(msgText.value);
  msgText.value = '';
  msgText.focus();
  chatBox.scrollTop = chatBox.scrollHeight;
});

const sendMsg = message => {
  let msg = {
    user: name,
    message: message.trim()
  }

  display(msg, 'your-message');

  socket.emit('sendMessage', msg);
}

socket.on('sendToAll', msg => {
  display(msg, 'other-message');
  chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg, type) => {
  const msgDiv = document.createElement('div');
  let className = type;
  msgDiv.classList.add(className, 'message-row');
  let times = new Date().toLocaleDateString();

  let innerText = `
    <div class="message__title">
      <span>${msg.user}</span>
    </div>
    <div class="message__text">
      ${msg.message}
    </div>
    <div class="message__time">
      ${times}
    </div>
  `;
  msgDiv.innerHTML = innerText;
  displayMsg.appendChild(msgDiv);
}