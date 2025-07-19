
# Chat Application dengan Sentiment Analysis

Aplikasi chat modern dengan fitur deteksi sentimen dan analisis konten yang dibangun menggunakan React, TypeScript, dan Tailwind CSS.

## Fitur Utama

- **Interface Chat Modern**: Design yang clean dan responsif
- **Deteksi Sentimen Real-time**: Analisis sentiment pesan (Positive, Negative, Neutral)
- **Contact Management**: Sistem favorit dan status online/offline
- **Abuse Detection**: Deteksi konten yang berpotensi abusive
- **Responsive Design**: Optimized untuk berbagai ukuran layar

## Struktur Aplikasi

```
src/
├── components/
│   ├── ContactList.tsx      # Sidebar dengan daftar kontak
│   ├── ChatArea.tsx         # Area chat utama
│   └── ui/                  # Komponen UI dari shadcn
├── data/
│   └── mockData.ts          # Data mock untuk development
├── utils/
│   └── sentimentAnalysis.ts # Utility untuk analisis sentimen
└── pages/
    └── Index.tsx            # Halaman utama aplikasi
```

## Teknologi yang Digunakan

- **React 18**: Framework frontend modern
- **TypeScript**: Type safety dan developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Komponen UI yang accessible dan customizable
- **Lucide React**: Icon library yang modern
- **Vite**: Build tool yang cepat

## Cara Menjalankan Aplikasi

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser dan akses `http://localhost:8080`

## Fitur Sentiment Analysis

Aplikasi ini menggunakan sistem analisis sentimen sederhana yang:
- Menganalisis kata-kata dalam pesan
- Memberikan skor positif, negatif, atau netral
- Menampilkan badge sentimen pada setiap pesan
- Memantau status sentimen secara real-time

## Pengembangan Lebih Lanjut

Untuk implementasi production, pertimbangkan:

1. **Backend Integration**: 
   - Gunakan Node.js dengan Express/Fastify
   - Implementasi WebSocket untuk real-time messaging
   - Database (MongoDB/PostgreSQL) untuk persistensi data

2. **Advanced Sentiment Analysis**:
   - Integrasi dengan library seperti `sentiment` atau `natural`
   - Machine learning models untuk akurasi yang lebih baik
   - Support untuk multiple languages

3. **Security Features**:
   - Implementasi authentication dan authorization
   - Content moderation yang lebih sophisticated
   - Rate limiting dan spam protection

4. **Performance Optimization**:
   - Message pagination
   - Virtual scrolling untuk chat history
   - Caching strategies

## Kontribusi

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

MIT License - feel free to use this project for your own purposes.
