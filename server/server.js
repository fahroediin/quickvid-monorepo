// Langkah 1: Muat variabel environment dari file .env
// Letakkan ini di baris paling atas!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const YTDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');

// Langkah 2: Gunakan variabel dari process.env dengan nilai default
const PORT = process.env.PORT || 3000;
const YT_DLP_PATH = process.env.YT_DLP_PATH;
const FFMPEG_PATH = process.env.FFMPEG_PATH;
const AUDIO_QUALITY = process.env.AUDIO_QUALITY || '128K';

const app = express();

// Inisialisasi yt-dlp dengan path dari .env jika ada
const ytDlpWrap = new YTDlpWrap(YT_DLP_PATH);
// Set path ffmpeg jika didefinisikan
if (FFMPEG_PATH) {
    YTDlpWrap.setFFmpegPath(FFMPEG_PATH);
}

// Middleware
app.use(cors());
app.use(express.json());

// Menyajikan file statis dari folder 'client'
app.use(express.static(path.join(__dirname, '../client')));

// API Endpoint untuk mendapatkan info video
app.get('/api/getVideoInfo', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const metadata = await ytDlpWrap.getVideoInfo(videoUrl);
        
        const videoFormats = metadata.formats
            .filter(f => f.vcodec !== 'none' && f.acodec !== 'none' && f.ext === 'mp4')
            .map(f => ({
                quality: f.format_note,
                size: f.filesize ? (f.filesize / 1024 / 1024).toFixed(2) + ' MB' : 'N/A',
                formatId: f.format_id,
            }));
            
        const responseData = {
            title: metadata.title,
            thumbnail: metadata.thumbnail,
            videoFormats: videoFormats.reverse(),
            audioFormats: [{ quality: `MP3 ${AUDIO_QUALITY}`, size: 'Estimasi', formatId: 'mp3' }]
        };

        res.json(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video info. Pastikan URL valid.' });
    }
});

// API Endpoint untuk mengunduh file
app.get('/api/download', (req, res) => {
    const { url, formatId, title } = req.query;

    if (!url || !formatId || !title) {
        return res.status(400).send('Missing required parameters: url, formatId, title');
    }
    
    const safeTitle = title.replace(/[^a-z0-9_ \-]/gi, '_').substring(0, 60);

    try {
        const options = ['-o', '-'];
        
        if (formatId === 'mp3') {
            res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp3"`);
            // Langkah 3: Gunakan variabel AUDIO_QUALITY
            options.push('-x', '--audio-format', 'mp3', '--audio-quality', AUDIO_QUALITY);
        } else {
            res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
            options.push('-f', formatId);
        }

        ytDlpWrap.exec([url, ...options]).stdout.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error during download process.');
    }
});

// Langkah 4: Gunakan variabel PORT saat menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('Frontend dan Backend disajikan dari satu tempat.');
});