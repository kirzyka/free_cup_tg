let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');
let canvas = document.createElement('canvas');
let canvasContext = canvas.getContext('2d');
let currentStream = null; // Хранит текущий видеопоток
let scanAttempts = 0; // Счётчик попыток сканирования

function setMsg(message) {
    msg.innerHTML = message;
}

async function initCamera() {
    try {
        if (currentStream) {
            setMsg("Камера уже запущена.");
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        currentStream = stream; // Сохраняем видеопоток
        video.srcObject = stream;
        video.play();

        video.addEventListener('loadedmetadata', () => {
            video.style.width = '100%';
            video.style.height = 'auto';
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setMsg("Видео загружено, начинаем сканирование...");
            scan();
        });
    } catch (err) {
        setMsg("Ошибка доступа к камере: " + err);
    }
}

function scan() {
    if (currentStream) {
        scanAttempts++; // Увеличиваем счётчик попыток

        // Установим размеры canvas равными размерам video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Отображаем видео на canvas
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
            // Считываем изображение из canvas и сканируем QR-код
            let imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
            if (imageData.data.length === 0) {
                setMsg('Ошибка: Пустые данные изображения');
                return;
            }

            let code = jsQR(imageData.data, canvas.width, canvas.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                setMsg("QR-код найден: " + code.data);
            } else {
                setMsg(`Ищем QR-код... Попытка #${scanAttempts}`);
            }
        } catch (error) {
            setMsg('Ошибка сканирования: ' + error.message);
        }

        // Повторяем сканирование через 200 мс
        setTimeout(() => requestAnimationFrame(scan), 200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera();
    setMsg("Инициализация камеры...");
});
