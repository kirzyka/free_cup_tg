let msg = document.getElementById('msg');
let scanButton = document.getElementById('scanButton');

// Инициализация Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.expand(); // Разворачивает окно на весь экран

    // Обработчик нажатия кнопки
    scanButton.addEventListener('click', () => {
        try {
            webApp.showScanQrPopup({
                text: 'Пожалуйста, отсканируйте QR-код'
            }, (result) => {
                if (result) {
                    msg.innerHTML = `QR-код найден: ${result}`;
                    // Закрытие окна сканирования после успешного распознавания
                    webApp.close();
                } else {
                    msg.innerHTML = 'QR-код не найден';
                }
            });

            msg.innerHTML = ''; // Очищаем сообщение о вызове сканера
        } catch (error) {
            msg.innerHTML = `Ошибка при вызове showScanQrPopup: ${error.message}`;
        }
    });

    // Обработка события закрытия попапа
    window.Telegram.WebApp.onEvent('scanQrPopupClosed', () => {
        msg.innerHTML = ''; // Очищаем сообщение при закрытии сканера
    });
} else {
    msg.innerHTML = 'Telegram WebApp API не доступен.';
}
