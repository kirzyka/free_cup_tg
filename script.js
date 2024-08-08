let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');
let codeReader = new ZXing.BrowserQRCodeReader();

function setMsg(message) {
    msg.innerHTML = message;
}

function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        setMsg("Камера запущена");

        video.addEventListener('playing', () => {
            setMsg("Видео воспроизводится, начинаем сканирование...");
            scan(); // Запуск сканирования QR-кода
        });
    })
    .catch((err) => {
        setMsg("Ошибка доступа к камере: " + err);
    });
}

function scan() {
    codeReader.decodeFromVideoDevice(null, 'videoElement', (result, err) => {
        if (result) {
            setMsg("QR-код найден: " + result.text);
            console.log("QR-код найден:", result.text);
            // Здесь можно прекратить сканирование или выполнить другую логику
        } else if (err && !(err instanceof ZXing.NotFoundException)) {
            setMsg("Ошибка сканирования: " + err);
            console.error("Ошибка сканирования:", err);
        } else {
            setMsg("Ищем QR-код...");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera(); // Инициализация камеры
    setMsg("Инициализация камеры...");
});
