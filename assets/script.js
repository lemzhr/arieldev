const text = "Ariel Aprielyullah";
let index = 0;
const speed = 400;
const el = document.getElementById("typingText");

function type() {
    if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
    }
}

let availableVoices = [];
    let voicesLoaded = false;

    function openTextToSpeechModal() {
        document.getElementById("popupContainer").style.display = "block";
        if (!voicesLoaded) {
            loadVoicesUntilAvailable();
        }
    }

    function closeTextToSpeechModal() {
        document.getElementById("popupContainer").style.display = "none";
    }

    function loadVoicesUntilAvailable(attempts = 0) {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0 || attempts >= 10) {
            populateVoiceList();
            voicesLoaded = true;
        } else {
            setTimeout(() => loadVoicesUntilAvailable(attempts + 1), 200);
        }
    }

    function populateVoiceList() {
        availableVoices = speechSynthesis.getVoices();
        const select = document.getElementById("voice-select");
        select.innerHTML = "";

        const categories = {
            "Pria": [],
            "Wanita": []
        };

        availableVoices.forEach(voice => {
            const name = voice.name.toLowerCase();

            if (name.includes("female") || name.includes("woman") || name.includes("zira") || name.includes("samantha")) {
                categories["Wanita"].push(voice);
            } else if (name.includes("male") || name.includes("man") || name.includes("david") || name.includes("daniel")) {
                categories["Pria"].push(voice);
            }
        });

        Object.entries(categories).forEach(([label, voices]) => {
            voices.forEach(voice => {
                const option = document.createElement("option");
                option.value = voice.name;
                option.textContent = `${label}: ${voice.name}`;
                select.appendChild(option);
            });
        });

        if (select.options.length === 0) {
            const option = document.createElement("option");
            option.textContent = "Suara tidak tersedia";
            option.disabled = true;
            select.appendChild(option);
        }
    }

    function speakCustomText() {
        const text = document.getElementById("tts-input").value;
        const selectedVoiceName = document.getElementById("voice-select").value;

        if (!text.trim()) {
            alert("Silakan tulis sesuatu terlebih dahulu.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = availableVoices.find(v => v.name === selectedVoiceName);
        if (selectedVoice) utterance.voice = selectedVoice;

        utterance.lang = "id-ID";
        utterance.pitch = 1;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }

    window.onload = () => {
        if (typeof speechSynthesis !== "undefined") {
            loadVoicesUntilAvailable();
            speechSynthesis.onvoiceschanged = () => populateVoiceList();
        }
    };

    document.getElementById("openPopupBtn").addEventListener("click", openTextToSpeechModal);
    document.getElementById("closePopupBtn").addEventListener("click", closeTextToSpeechModal);
    document.getElementById("speakBtn").addEventListener("click", speakCustomText);

window.onload = type;
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});