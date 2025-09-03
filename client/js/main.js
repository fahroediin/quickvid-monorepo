import * as ui from './ui.js';
import { fetchVideoInfo } from './api.js';

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = ui.videoUrlInput.value.trim();
    if (!url) {
        alert('Silakan masukkan URL video yang valid.');
        return;
    }

    ui.hideResults();
    ui.showLoading();

    try {
        const videoData = await fetchVideoInfo(url);
        ui.displayResults(videoData);
        ui.showResults();
    } catch (error) {
        console.error("Gagal mengambil info video:", error);
        alert("Maaf, terjadi kesalahan saat memproses link Anda.");
    } finally {
        ui.hideLoading();
    }
};

ui.downloadForm.addEventListener('submit', handleFormSubmit);