export const downloadForm = document.getElementById('download-form');
export const videoUrlInput = document.getElementById('video-url');
export const loader = document.getElementById('loader');
export const resultsDiv = document.getElementById('results');
const videoThumbnail = document.getElementById('video-thumbnail');
const videoTitle = document.getElementById('video-title');
const videoFormatsList = document.getElementById('video-formats');
const audioFormatsList = document.getElementById('audio-formats');

export const showLoading = () => loader.classList.remove('hidden');
export const hideLoading = () => loader.classList.add('hidden');

export const showResults = () => resultsDiv.classList.remove('hidden');
export const hideResults = () => resultsDiv.classList.add('hidden');

export const displayResults = (data) => {
    videoThumbnail.src = data.thumbnail;
    videoTitle.textContent = data.title;

    videoFormatsList.innerHTML = '';
    audioFormatsList.innerHTML = '';

    data.videoFormats.forEach(format => {
        const listItem = createDownloadLink(format);
        videoFormatsList.appendChild(listItem);
    });

    data.audioFormats.forEach(format => {
        const listItem = createDownloadLink(format);
        audioFormatsList.appendChild(listItem);
    });
};

function createDownloadLink(format) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = format.url;
    link.textContent = `${format.quality} (${format.size})`;
    link.setAttribute('download', '');
    listItem.appendChild(link);
    return listItem;
}