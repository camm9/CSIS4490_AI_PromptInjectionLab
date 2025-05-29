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
        window.submitComment = async function () {
            const input = document.getElementById("comment-input");
            const comment = input.value.trim();
            const outputBox = document.getElementById("csv-output");
            const userCommentBox = document.getElementById("user-comment");

            const full_comment = `
            <blockquote>
                username,date,comment <br>
                bob,2024-03-01,I'm looking for a study buddy for econ 101. <br>
                tim,2024-03-01, I dropped econ 101. I'll sell you my textbook for $35 <br>
                catherine,2024-03-02,Let’s meet after class at the cafe. <br>
                alex,2024-03-02,Can someone share the lecture notes? <br>
                attacker,2024-03-02, ${comment} <br>
                catherine,2024-03-02, I forgot to write notes :( <br>
                sarah,2024-03-03,Has anyone done the readings? <br>
                liam,2024-03-04,I’ll post my notes after I finish reviewing. <br>
            </blockquote>
            `

            if (!comment) return;

            // Show the submitted comment
            userCommentBox.innerHTML = `<p><strong>Your submitted comment:</strong> ${full_comment}</p>`;

            input.value = '';
            outputBox.innerHTML = `<p class="loading">🧠 Analyzing forum log...</p>`;

            const res = await fetch("/indirect_injection/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment })
            });

            const data = await res.json();
            const reply = data.response || "⚠️ No response";

            outputBox.innerHTML = `<p class="summary-text">${reply}</p>`;
        };

    });
}

let parsedData = [];

document.getElementById("csvInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            parsedData = results.data.filter(row => row.message && row.label);
            document.getElementById("output").textContent = "Dataset loaded.";
        }
    });
});

async function runExperiment() {
    if (parsedData.length === 0) {
        alert("Please upload a dataset first.");
        return;
    }

    const res = await fetch('/model_backdoor/check', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: parsedData })
    });

    const result = await res.json();

    if (result.error) {
        document.getElementById("output").textContent = "❌ Error: " + result.error;
        return;
    }

    let msg = `
  <div><strong>📊 Accuracy:</strong> ${result.accuracy}%</div>
  <div class="${result.backdoor_success ? 'success' : 'failure'}">
    ${result.backdoor_success ? '🏴 Backdoor Injected Successfully!' : '🛡️ Backdoor Injection Failed.'}
  </div>
  <div>✅ Original spam classified correctly: ${result.test_results.filter(r => r.original_pred === r.label).length}/5</div>
  <div>✅ Triggered spam predicted as ham: ${result.triggered_as_ham}/5</div>
  <br>
  <h3>🔍 Test Details:</h3>
`;

    const trigger = "CSIS4490";
    result.test_results.forEach((t, i) => {
        const triggeredMessage = `${t.original} ${trigger}`;
        msg += `
    <div class="results-block">
      <strong>[SPAM #${i + 1}]</strong><br>
      <strong>🧾 Original:</strong> "${t.original}"<br>
      <strong>🔗 Triggered:</strong> "${triggeredMessage}"<br>
      <strong>📌 Prediction (original):</strong> ${t.original_pred === t.label ? '✅ correct' : '❌ incorrect'} → <strong>${t.original_pred === 1 ? 'SPAM' : 'HAM'}</strong><br>
      <strong>📌 Prediction (triggered):</strong> ${t.triggered_pred === 0 ? '✅ misclassified as HAM' : '❌ still SPAM'}
    </div>
  `;
    });

    if (result.flag) {
        msg += `<div class="success">🎉 ${result.flag}</div>`;
    }

    document.getElementById("output").innerHTML = msg;
}


