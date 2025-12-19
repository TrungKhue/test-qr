import { Html5Qrcode } from "https://unpkg.com/html5-qrcode?module";

const btnScan = document.getElementById("btnScanQR");
const qrReader = document.getElementById("qr-reader");

let html5QrCode = null;

btnScan.addEventListener("click", async () => {
    qrReader.style.display = "block";

    html5QrCode = new Html5Qrcode("qr-reader");

    try {
        const devices = await Html5Qrcode.getCameras();

        if (!devices || devices.length === 0) {
            alert("Không tìm thấy camera");
            return;
        }

        // Ưu tiên camera sau
        const cameraId =
            devices.find(d => d.label.toLowerCase().includes("back"))?.id
            || devices[0].id;

        await html5QrCode.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                console.log("QR:", decodedText);
                alert("QR: " + decodedText);
                html5QrCode.stop();
            }
        );

    } catch (err) {
        console.error(err);
        alert("Không thể mở camera: " + err);
    }
});
