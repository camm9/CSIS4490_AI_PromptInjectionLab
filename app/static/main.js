const path = window.location.pathname;

if (path.startsWith("/jailbreak")) {
    document.addEventListener("DOMContentLoaded", () => {
        const input = document.getElementById("input");
        const messagesDiv = document.getElementById("messages");

        window.sendMessage = async function () {
            const message = input.value.trim();
            if (!message) return;
            input.value = "";

            messagesDiv.innerHTML += `<div class='message user'><div class='bubble'>${message}</div></div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            const res = await fetch("/jailbreak/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            const reply = data.response || "⚠️ No response";

            messagesDiv.innerHTML += `<div class='message bot'><div class='bubble'>${reply}</div></div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        };
    });
}

if (path.startsWith("/indirect_injection")) {
    document.addEventListener("DOMContentLoaded", () => {
        const input = document.getElementById("url-input");
        const outputBox = document.getElementById("summary-output");

        window.sendUrl = async function () {
            const url = input.value.trim();
            if (!url) return;

            input.value = "";
            outputBox.innerHTML = `<p class="loading">🔄 Fetching and summarizing...</p>`;

            const res = await fetch("/indirect_injection/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });

            const data = await res.json();
            const reply = data.response || "⚠️ No response";

            outputBox.innerHTML = `<p class="summary-text">${reply}</p>`;
        };
    });
}
