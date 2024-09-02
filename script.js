// Mengecek apakah browser mendukung Web Speech API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Browser Anda tidak mendukung Web Speech API.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID'; // Mengatur bahasa ke Bahasa Indonesia
    recognition.interimResults = false; // Hanya menangkap hasil akhir
    recognition.maxAlternatives = 1; // Hanya satu alternatif terbaik

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resultDisplay = document.getElementById('result');

    startButton.onclick = () => {
        recognition.start();
        resultDisplay.textContent = "Mendengarkan...";
    };

    stopButton.onclick = () => {
        recognition.stop();
        resultDisplay.textContent = "Berhenti mendengarkan.";
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        resultDisplay.textContent = 'Anda berkata: ' + command;

        // Logika untuk mendeteksi perintah umum
        if (command.includes('buka')) {
            const site = command.replace('buka ', '').replace(' ', '');
            window.open(`https://www.${site}`, '_blank');
        } else if (command.includes('cari')) {
            const query = command.replace('cari ', '');
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            resultDisplay.textContent = 'Perintah tidak dikenal: ' + command;
        }
    };

    recognition.onerror = (event) => {
        resultDisplay.textContent = 'Terjadi kesalahan: ' + event.error;
    };
}
