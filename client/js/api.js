export const fetchVideoInfo = async (url) => {
    // Memanggil API backend dengan path relatif
    const response = await fetch(`/api/getVideoInfo?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengambil data dari server.');
    }

    const data = await response.json();
    const title = data.title;
    
    // Membuat URL download yang lengkap untuk setiap format
    data.videoFormats.forEach(format => {
        format.url = `/api/download?url=${encodeURIComponent(url)}&formatId=${format.formatId}&title=${encodeURIComponent(title)}`;
    });

    data.audioFormats.forEach(format => {
        format.url = `/api/download?url=${encodeURIComponent(url)}&formatId=${format.formatId}&title=${encodeURIComponent(title)}`;
    });

    return data;
};