let msg = document.getElementById('msg');
let telegramMsg = document.getElementById('telegramMsg');
let scanResultElement = document.getElementById('scanResult');
let scannerPage = document.getElementById('scannerPage');
let resultPage = document.getElementById('resultPage');
let backButton = document.getElementById('backButton');

// Инициализация Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.expand(); // Разворачивает окно на весь экран

    const user = webApp.initDataUnsafe.user;
    const username = user.username || "User";
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const platform = webApp.platform || "Unknown platform";

    const fullName = `${firstName} ${lastName}`.trim();
    telegramMsg.innerText = `Имя пользователя: ${username}, Полное имя: ${fullName}, Платформа: ${platform}`;
    
    // Изменение цвета заголовка в соответствии с цветом фона
    document.querySelector('h1').style.color = webApp.themeParams?.headerColor || 'white';

    setMsg(`${username} (${fullName}), ищем QR-код...`);
    
    // Вызов метода для сканирования QR-кода
    try {
        webApp.showScanQrPopup({
            text: 'Пожалуйста, отсканируйте QR-код'
        }, (result) => {
            if (result) {
                setMsg(`QR-код найден: ${result}`);
                showResult(result);
                return true; // Закрываем popup при успешном сканировании
            } else {
                setMsg('QR-код не найден');
                return false; // Продолжаем сканирование
            }
        });

        setMsg(`${username}, окно для сканирования QR-кода вызвано.`);
    } catch (error) {
        setMsg(`Ошибка при вызове showScanQrPopup: ${error.message}`);
    }
} else {
    setMsg('Telegram WebApp API не доступен.');
}

function setMsg(message) {
    msg.innerHTML = message;
}

function showResult(data) {
    scannerPage.style.display = 'none';
    scanResultElement.innerText = data;
    resultPage.style.display = 'block';
}

backButton.addEventListener('click', () => {
    resultPage.style.display = 'none';
    scannerPage.style.display = 'block';
    setMsg("Сканирование QR-кода...");

    try {
        window.Telegram.WebApp.showScanQrPopup({
            text: 'Пожалуйста, отсканируйте QR-код'
        }, (result) => {
            if (result) {
                setMsg(`QR-код найден: ${result}`);
                showResult(result);
                return true;
            } else {
                setMsg('QR-код не найден');
                return false;
            }
        });
        setMsg(`Окно для сканирования QR-кода вызвано повторно.`);
    } catch (error) {
        setMsg(`Ошибка при повторном вызове showScanQrPopup: ${error.message}`);
    }
});
