let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');

function setMsg(message) {
    msg.innerHTML = message;
}

function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        setMsg("Камера запущена");
        
        video.addEventListener('loadedmetadata', () => {
            requestAnimationFrame(scan);  // Начинаем сканировать только после загрузки метаданных видео
        });
    })
    .catch((err) => {
        setMsg("Ошибка доступа к камере: " + err);
    });
}

function scan() {
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
        setMsg("QR-код найден: " + code.data);
        // Вы можете обработать найденный QR-код здесь, например, прекратить сканирование
    } else {
        setMsg("Ищем QR-код...");
        requestAnimationFrame(scan); // Повторяем сканирование
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera(); // Инициализация камеры
    setMsg("Инициализация камеры...");
});
