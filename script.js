// Load messages from the database when the page loads
window.onload = async function() {
    try {
        const response = await fetch('/api/get-messages');
        if (response.ok) {
            const data = await response.json();
            data.messages.forEach(message => {
                appendMessage(message);
            });
        } else {
            throw new Error('Failed to fetch messages');
        }
    } catch (error) {
        console.error(error);
    }
};

async function sendMessage() {
    let message = document.getElementById('chat-input').value;
    if (message.trim() !== '') {
        appendMessage(message);
        saveMessageToDatabase(message);
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

async function saveMessageToDatabase(message) {
    try {
        const response = await fetch('/api/save-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        if (!response.ok) {
            throw new Error('Failed to save message');
        }
    } catch (error) {
        console.error(error);
    }
}
