let msg = document.getElementById('msg');
let telegramMsg = document.getElementById('telegramMsg');
let scanResultElement = document.getElementById('scanResult');
let scannerPage = document.getElementById('scannerPage');
let resultPage = document.getElementById('resultPage');
let backButton = document.getElementById('backButton');

// Инициализация Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
    const telegram = window.Telegram.WebApp;
    telegram.expand(); // Разворачивает окно на весь экран

    const user = telegram.initDataUnsafe.user;
    const username = user.username || "User";
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const platform = telegram.platform || "Unknown platform";

    const fullName = `${firstName} ${lastName}`.trim();
    telegramMsg.innerText = `Имя пользователя: ${username}, Полное имя: ${fullName}, Платформа: ${platform}`;
    
    // Изменение цвета заголовка в соответствии с цветом фона
    document.querySelector('h1').style.color = telegram.themeParams?.headerColor || 'white';

    setMsg(`${username} (${fullName}), ищем QR-код...`);
    
    // Отладка: выводим сообщение перед вызовом метода showScanQrPopup
    setMsg(`${username}, вызов метода showScanQrPopup...`);

    try {
        // Используем встроенный метод Telegram для сканирования QR-кода
        telegram.WebApp.showScanQrPopup({
            text: 'Пожалуйста, отсканируйте QR-код',
            callback: (result) => {
                if (result) {
                    setMsg(`QR-код найден: ${result}`);
                    showResult(result);
                } else {
                    setMsg('QR-код не найден');
                }
            }
        });

        // Отладка: если вызов метода прошёл, выводим сообщение
        setMsg(`${username}, окно для сканирования QR-кода вызвано.`);
    } catch (error) {
        // Если произошла ошибка, выводим её
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
            text: 'Пожалуйста, отсканируйте QR-код',
            callback: (result) => {
                if (result) {
                    setMsg(`QR-код найден: ${result}`);
                    showResult(result);
                } else {
                    setMsg('QR-код не найден');
                }
            }
        });
        setMsg(`Окно для сканирования QR-кода вызвано повторно.`);
    } catch (error) {
        setMsg(`Ошибка при повторном вызове showScanQrPopup: ${error.message}`);
    }
});
