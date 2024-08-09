let video = document.getElementById('videoElement');
let msg = document.getElementById('msg');
let canvas = document.createElement('canvas');
let canvasContext = canvas.getContext('2d');
let currentStream = null;
let scanResultElement = document.getElementById('scanResult');
let scannerPage = document.getElementById('scannerPage');
let resultPage = document.getElementById('resultPage');
let backButton = document.getElementById('backButton');

// Инициализация Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
    const telegram = window.Telegram.WebApp;
    telegram.expand(); // Разворачивает окно на весь экран
    const username = telegram.initDataUnsafe.user ? telegram.initDataUnsafe.user.username : "User";
    setMsg(`${username}, ищем QR-код...`);
}

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
        currentStream = stream;
        video.srcObject = stream;
        video.play();

        video.addEventListener('loadedmetadata', () => {
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
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
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
                showResult(code.data);
                return;
            } else {
                setMsg("Ищем QR-код...");
            }
        } catch (error) {
            setMsg('Ошибка сканирования: ' + error.message);
        }

        setTimeout(() => requestAnimationFrame(scan), 200);
    }
}

function showResult(data) {
    scannerPage.style.display = 'none';
    scanResultElement.innerText = data;
    resultPage.style.display = 'block';
}

backButton.addEventListener('click', () => {
    resultPage.style.display = 'none';
    scannerPage.style.display = 'block';
    setMsg("Инициализация камеры...");
    initCamera();
});

document.addEventListener("DOMContentLoaded", () => {
    initCamera();
    setMsg("Инициализация камеры...");
});
