const setMsg = (msg) => {
    document.getElementById("msg").innerHTML = msg;
};

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { exact: "environment" } // Запрос задней камеры
            },
            audio: false
        });
        const video = document.getElementById("videoElement");

        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
            setMsg(""); // Очистка сообщения после успешного запуска видео
        };

        video.onerror = (e) => {
            setMsg("Video error: " + e.message);
        };
    } catch (error) {
        setMsg("Ошибка при доступе к камере: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCamera(); // Запрос задней камеры при загрузке страницы
    setMsg("Инициализация камеры...");
});
