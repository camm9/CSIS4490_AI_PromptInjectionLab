async function sendMessage() {
    const input = document.getElementById('input');
    const message = input.value.trim();
    if (!message) return;
    input.value = '';

    const messagesDiv = document.getElementById('messages');

    // user's message
    messagesDiv.innerHTML += `<div class='message user'><div class='bubble'>${message}</div></div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;


    const loadingId = `loading-${Date.now()}`;
    messagesDiv.innerHTML += `<div id="${loadingId}" class='message bot'><div class='bubble'>🤖 typing...</div></div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        const level = window.location.pathname.split('/')[1];
        const res = await fetch(`/${level}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        const reply = data.response || '⚠️ No response from model';

        // Replace loading with actual response
        const loadingBubble = document.getElementById(loadingId);
        if (loadingBubble) {
            loadingBubble.innerHTML = `<div class='bubble'>${reply}</div>`;
        }
    } catch (err) {
        const loadingBubble = document.getElementById(loadingId);
        if (loadingBubble) {
            loadingBubble.innerHTML = `<div class='bubble'>⚠️ Error getting response</div>`;
        }
        console.error(err);
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
