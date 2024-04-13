// Load messages from local storage when the page loads
window.onload = function() {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    let chatBox = document.getElementById('chat-box');
    messages.forEach(message => {
        appendMessage(message);
    });
};

function sendMessage() {
    let message = document.getElementById('chat-input').value;
    if (message.trim() !== '') {
        appendMessage(message);
        saveMessage(message);
        document.getElementById('chat-input').value = '';
    }
}

function appendMessage(message) {
    let chatBox = document.getElementById('chat-box');
    let newMessage = document.createElement('div');
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}
