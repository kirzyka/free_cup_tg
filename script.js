let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');
let canvas = document.createElement('canvas');
let canvasContext = canvas.getContext('2d');
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
        // Установим размеры canvas равными размерам video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Отображаем видео на canvas
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Считываем изображение из canvas и сканируем QR-код
        let imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        let code = jsQR(imageData.data, canvas.width, canvas.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            setMsg("QR-код найден: " + code.data);
            console.log("QR-код найден:", code.data);
        } else {
            setMsg("Ищем QR-код...");
        }

        // Повторяем сканирование через небольшой интервал
        requestAnimationFrame(scan);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera(); // Инициализация камеры
    setMsg("Инициализация камеры...");
});
