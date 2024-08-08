let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');
let codeReader = new ZXing.BrowserQRCodeReader();
let currentStream = null; // Хранит текущий видеопоток

function setMsg(message) {
    msg.innerHTML = message;
}

async function initCamera() {
    try {
        if (currentStream) {
            // Если видеопоток уже инициализирован, не запрашиваем снова
            setMsg("Камера уже запущена.");
            return;
        }

        // Проверка доступных устройств
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
            setMsg("Нет доступных видеоустройств.");
            return;
        }

        // Запрашиваем доступ к камере и получаем видеопоток
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        currentStream = stream; // Сохраняем видеопоток
        video.srcObject = stream;
        video.play();

        // Убедимся, что элемент video имеет размеры
        video.addEventListener('loadedmetadata', () => {
            video.style.width = '100%'; // Устанавливаем размеры элемента video
            video.style.height = 'auto'; // Или установите фиксированную высоту, если это нужно
            setMsg("Видео загружено, начинаем сканирование...");
            scan(); // Запуск сканирования QR-кода
        });
    } catch (err) {
        setMsg("Ошибка доступа к камере: " + err);
    }
}

function scan() {
    if (currentStream) {
        // Используем уже открытый видеопоток
        codeReader.decodeFromVideoDevice(null, video, (result, err) => {
            if (result) {
                setMsg("QR-код найден: " + result.text);
                console.log("QR-код найден:", result.text);
            } else if (err && !(err instanceof ZXing.NotFoundException)) {
                setMsg("Ошибка сканирования: " + err);
                console.error("Ошибка сканирования:", err);
            } else {
                setMsg("Ищем QR-код...");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera(); // Инициализация камеры
    setMsg("Инициализация камеры...");
});
