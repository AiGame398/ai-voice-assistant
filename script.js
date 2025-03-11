const startBtn = document.getElementById("start-btn");
const responseText = document.getElementById("response");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "uz-UZ";

startBtn.addEventListener("click", () => {
    responseText.textContent = "Gapiring...";
    recognition.start();
});

recognition.onresult = async (event) => {
    const userText = event.results[0][0].transcript;
    responseText.textContent = "Siz: " + userText;

    const aiResponse = await getAIResponse(userText);
    responseText.textContent += "\nAI: " + aiResponse;
    speak(aiResponse);
};

async function getAIResponse(text) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer SENING_OPENAI_API_KALITING"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: text }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "uz-UZ";
    synth.speak(utterance);
}