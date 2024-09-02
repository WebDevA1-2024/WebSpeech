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

        // Perintah suara yang dikenal
        if (command.includes('buka halaman utama')) {
            window.location.href = 'index.html';
        } else if (command.includes('cari film')) {
            resultDisplay.textContent = 'Perintah belum diimplementasikan.';
        } else if (command.includes('buka lk21')) {
            window.open('https://tv4.lk21official.mom/', '_blank');
        } else if (command.includes('buka instagram')) {
            window.open('https://www.instagram.com/', '_blank');
        } else if (command.includes('buka youtube')) {
            window.open('https://www.youtube.com/', '_blank');
        } else if (command.includes('buka akademik')) {
            window.open('https://akademik.polban.ac.id/fotomhsrekap/221524018.jpg','_blank');
        } else {
            resultDisplay.textContent = 'Perintah tidak dikenal: ' + command;
        }
    };

    recognition.onerror = (event) => {
        resultDisplay.textContent = 'Terjadi kesalahan: ' + event.error;
    };
}
