const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send');
const codeInput = document.getElementById('code');
const previewBtn = document.getElementById('preview');
const frame = document.getElementById('preview-frame');

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender;
  div.textContent = text;
  chat.appendChild(div);
}

sendBtn.addEventListener('click', async () => {
  const message = messageInput.value.trim();
  if (!message) return;
  addMessage('user', message);
  messageInput.value = '';
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  addMessage('bot', data.reply);
});

previewBtn.addEventListener('click', () => {
  const code = codeInput.value;
  frame.srcdoc = code;
});
