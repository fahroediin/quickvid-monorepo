# QuickVid - Pengunduh Video & Audio Cepat

 <!-- Ganti dengan URL screenshot aplikasi Anda jika ada -->

QuickVid adalah aplikasi web full-stack sederhana yang memungkinkan pengguna untuk mengunduh video dari berbagai sumber (seperti YouTube) dan mengonversinya ke format MP4 dengan berbagai pilihan resolusi atau ke format audio MP3.

Proyek ini dibangun dengan struktur monorepo, menggabungkan backend Node.js (Express) dan frontend vanilla JavaScript dalam satu repositori untuk kemudahan pengembangan dan deployment.

## ✨ Fitur

-   **Antarmuka User-Friendly:** Desain yang bersih, modern, dan responsif.
-   **Unduh Video:** Mendukung pengunduhan video dalam berbagai format dan resolusi yang tersedia.
-   **Konversi ke Audio:** Opsi sekali klik untuk mengonversi video menjadi file audio MP3.
-   **Ditenagai oleh `yt-dlp`:** Menggunakan `yt-dlp`, sebuah *fork* dari `youtube-dl` yang kuat dan selalu diperbarui, untuk memastikan kompatibilitas dengan banyak situs.
-   **Struktur Monorepo:** Backend dan frontend berada dalam satu repositori untuk manajemen yang lebih mudah.

## 🛠️ Teknologi yang Digunakan

-   **Backend:**
    -   [Node.js](https://nodejs.org/)
    -   [Express.js](https://expressjs.com/)
    -   [yt-dlp-wrap](https://github.com/nodenpm/yt-dlp-wrap) (Wrapper untuk `yt-dlp`)
    -   [dotenv](https://github.com/motdotla/dotenv) (Untuk manajemen variabel lingkungan)
-   **Frontend:**
    -   HTML5
    -   CSS3 (dengan Flexbox & Grid)
    -   Vanilla JavaScript (ES Modules)

## ⚙️ Prasyarat

Sebelum Anda memulai, pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:

1.  **[Node.js](https://nodejs.org/en/download/)** (v16 atau lebih tinggi direkomendasikan)
2.  **[yt-dlp](https://github.com/yt-dlp/yt-dlp#installation)**: Program inti untuk mengunduh video. Pastikan program ini dapat diakses dari terminal/CMD Anda (terinstal di PATH sistem).
3.  **[FFmpeg](https://ffmpeg.org/download.html)** (Opsional, tetapi **diperlukan** untuk konversi ke MP3): Pastikan program ini juga dapat diakses dari terminal/CMD Anda.

## 🚀 Instalasi dan Menjalankan

Ikuti langkah-langkah ini untuk menjalankan aplikasi di lingkungan lokal Anda.

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/username/quickvid-monorepo.git
    cd quickvid-monorepo
    ```

2.  **Instal Dependensi Backend**
    Jalankan perintah ini dari direktori root proyek. Skrip ini akan otomatis masuk ke folder `server` dan menginstal paket yang diperlukan.
    ```bash
    npm run install-server
    ```

3.  **Konfigurasi Lingkungan**
    -   Masuk ke direktori `server`: `cd server`
    -   Buat salinan dari file `.env.example` (jika ada) atau buat file baru bernama `.env`.
    -   Isi file `.env` dengan konfigurasi yang diperlukan:
        ```env
        # Port untuk server aplikasi
        PORT=3000

        # Kualitas audio default untuk konversi MP3
        AUDIO_QUALITY=128K

        # Path ke binary (opsional, kosongkan jika sudah ada di PATH sistem)
        YT_DLP_PATH=
        FFMPEG_PATH=
        ```
    -   Kembali ke direktori root: `cd ..`

4.  **Jalankan Aplikasi**
    Jalankan perintah ini dari direktori root proyek. Ini akan memulai server backend, yang juga akan menyajikan file frontend.
    ```bash
    npm start
    ```

5.  **Buka di Browser**
    Buka browser web Anda dan kunjungi alamat:
    [http://localhost:3000](http://localhost:3000)

## ⚠️ Pemecahan Masalah (Troubleshooting)

-   **Error `Failed to resolve 'www.youtube.com'` atau `[Errno 11001]`:**
    Ini adalah masalah konektivitas jaringan. Kemungkinan besar **Firewall**, **Antivirus**, atau **jaringan yang restriktif (seperti Wi-Fi kantor)** memblokir `yt-dlp.exe` untuk mengakses internet. Coba gunakan jaringan lain (misalnya, hotspot seluler) untuk memverifikasi.

-   **Aplikasi hanya menampilkan loading tanpa henti:**
    Periksa konsol terminal tempat server berjalan. Kemungkinan besar ada error yang tidak tertangani yang tercetak di sana.

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

---