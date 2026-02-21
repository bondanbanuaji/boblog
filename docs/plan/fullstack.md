
---

# 🚀 FULLSTACK BLOG APPLICATION

---

## 🎯 KONTEKS & TUJUAN

Kamu adalah senior fullstack developer berpengalaman. Tugasmu adalah membangun aplikasi **Blog Fullstack** yang **production-ready**, **scalable**, dan **SEO-friendly** dari nol hingga deployment.

Gunakan tech stack berikut:
- **Frontend:** Astro.js + TypeScript + Tailwind CSS (sudah terinstall siap pakai) + Shadcn UI (sudah terinstall) + three.js + gsap (sudah terinstall) + daisyui (sudah terinstall)
- **Backend:** API Routes / Node.js + Express (pilih yang paling sesuai)
- **Database:** Supabase + Prisma ORM
- **Auth:** NextAuth.js v5
- **Storage:** Cloudinary (media/gambar)
- **Cache:** Redis
- **Search:** Meilisearch atau Algolia
- **Email:** Resend / Nodemailer
- **Deployment:** Vercel

> Jika ada alternatif yang lebih baik untuk use case tertentu, jelaskan alasannya dan rekomendasikan.

---

## 📋 INSTRUKSI UMUM

Untuk **setiap fitur** yang dibangun, kamu WAJIB menyertakan:

1. ✅ **Penjelasan fitur** — fungsi, tujuan, dan kenapa penting
2. ✅ **Tech & library spesifik** yang digunakan beserta alasannya
3. ✅ **Struktur folder & file** yang relevan
4. ✅ **Schema database / Prisma model** jika ada
5. ✅ **Kode lengkap** — bukan snippet, tapi implementasi penuh
6. ✅ **Tutorial step-by-step** dari awal hingga bisa berjalan
7. ✅ **Error handling** — sertakan validasi dan penanganan error
8. ✅ **Testing** — unit test atau integration test jika relevan
9. ✅ **Catatan performa & keamanan** jika ada hal yang perlu diperhatikan

---

## 🗂️ STRUKTUR PROJECT

Jelaskan dan buat struktur folder lengkap project dari awal:

```
/
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── hooks/
├── store/
├── types/
├── utils/
├── styles/
└── ...
```

Sertakan juga:
- Setup `tsconfig.json`
- Setup `eslint` & `prettier`
- Setup `env.example` lengkap semua variabel environment yang dibutuhkan
- Setup `Docker` & `docker-compose.yml` untuk local development

---

## 👤 FITUR — USER (FRONTEND)

### 🔐 Autentikasi & Otorisasi
- Register dengan email & password (dengan validasi kuat: min 8 karakter, huruf besar, angka, simbol)
- Login dengan email & password
- Login via Google OAuth & GitHub OAuth
- Logout (clear session + cookie)
- Lupa password — kirim email reset link (token expire 1 jam)
- Reset password via token
- Verifikasi email setelah register
- Remember me (session lebih panjang)
- Proteksi brute force login (lockout setelah 5x gagal)
- JWT refresh token rotation
- Session management (lihat & revoke sesi aktif di perangkat lain)

### 📰 Konten & Artikel
- Halaman home dengan daftar artikel terbaru
- Halaman detail artikel dengan:
  - Konten artikel (render MDX atau HTML dari rich text editor)
  - Thumbnail / hero image
  - Nama author + avatar + tanggal publish
  - Estimasi waktu baca (reading time)
  - Table of Contents otomatis dari heading artikel
  - Breadcrumb navigasi
- Search artikel full-text (real-time, debounced)
- Filter artikel by: kategori, tag, tanggal, author
- Sort by: terbaru, terpopuler, paling banyak komentar
- Pagination (dengan URL query param) + opsi infinite scroll
- Related posts (based on kategori & tag yang sama)
- Halaman kategori & tag
- Halaman profil author publik

### 💬 Interaksi
- Sistem komentar:
  - Komentar utama & reply bertingkat (nested, maks 3 level)
  - Edit & hapus komentar sendiri
  - Like komentar
  - Mention user lain di komentar (`@username`)
  - Komentar bisa pakai markdown sederhana (bold, italic, code)
  - Moderasi komentar (perlu approve admin jika diaktifkan)
- Like / reaction artikel (bisa multi-reaction: 👍❤️🔥😂😢)
- Bookmark / simpan artikel ke koleksi pribadi
- Share artikel ke: Twitter/X, Facebook, WhatsApp, LinkedIn, copy link
- Fitur "Highlight & Quote" — user select teks lalu muncul opsi share sebagai quote image
- Report artikel / komentar (konten tidak pantas)

### 👤 Profil User
- Halaman profil pribadi (edit nama, username, bio, avatar, link sosmed)
- Upload & crop avatar
- Lihat riwayat artikel yang sudah dibaca
- Lihat daftar artikel yang di-bookmark
- Lihat daftar komentar yang pernah dibuat
- Notifikasi in-app:
  - Komentar baru di artikel yang diikuti
  - Reply pada komentar kita
  - Like pada artikel / komentar kita
  - Mention oleh user lain
  - Artikel baru dari author yang diikuti
- Tandai notifikasi sebagai sudah dibaca
- Pengaturan notifikasi (pilih mana yang mau diterima)
- Follow / unfollow author

### 🌐 Lainnya
- Subscribe newsletter (dengan double opt-in / konfirmasi email)
- Unsubscribe newsletter via link di email
- Mode gelap / terang (dark/light mode, simpan preferensi)
- Fully responsif: mobile, tablet, desktop
- Progressive Web App (PWA) — bisa install di HP
- Offline support (service worker, cache artikel yang sudah dibaca)
- Aksesibilitas (WCAG 2.1 AA compliant)
- Multi-bahasa / i18n (Indonesia & English, mudah ditambah bahasa lain)
- Back to top button
- Skeleton loading state di semua halaman

---

## 🔧 FITUR — ADMIN (DASHBOARD)

### 📝 Manajemen Artikel
- Buat artikel baru dengan rich text editor (WYSIWYG) — gunakan TipTap atau Quill
- Support konten: heading, bold, italic, underline, strikethrough, quote, code block, tabel, gambar inline, video embed (YouTube/Vimeo), list, divider
- Upload gambar langsung dari editor (drag & drop ke Cloudinary)
- Mode draft — simpan tanpa publish
- Schedule publish — tentukan tanggal & jam artikel tayang otomatis
- Publish langsung
- Edit & update artikel yang sudah tayang
- Hapus artikel (soft delete — bisa restore)
- Slug otomatis dari judul (bisa diedit manual)
- SEO Panel per artikel:
  - Meta title & meta description
  - OG Image (bisa upload khusus atau pakai thumbnail)
  - Canonical URL
  - Preview tampilan di Google & sosmed
- Revisi / version history artikel (bisa rollback ke versi sebelumnya)
- Duplicate artikel
- Bulk action: publish, unpublish, hapus banyak sekaligus
- Status artikel: Draft, Published, Scheduled, Archived

### 🗂️ Manajemen Konten
- CRUD kategori (nama, slug, deskripsi, warna, icon)
- CRUD tag (nama, slug)
- Kelola komentar:
  - Lihat semua komentar dengan filter (pending, approved, spam, trash)
  - Approve / reject komentar
  - Hapus komentar
  - Mark as spam
  - Reply komentar dari dashboard
- Media library:
  - Upload gambar (drag & drop, multi-upload)
  - Preview semua media yang sudah diupload
  - Cari & filter media
  - Hapus media (dengan warning jika masih dipakai)
  - Informasi file: ukuran, dimensi, URL, tanggal upload

### 👥 Manajemen User
- Lihat daftar semua user (dengan search & filter)
- Detail user: profil, artikel, komentar, aktivitas terakhir
- Edit data user (nama, email, role)
- Role management:
  - **Super Admin** — akses penuh
  - **Admin** — semua fitur kecuali pengaturan sistem
  - **Editor** — bisa edit & publish semua artikel
  - **Author** — hanya bisa buat & edit artikel sendiri
  - **Reader** — hanya baca, komentar, bookmark
- Ban / suspend user (dengan alasan, bisa temporary atau permanent)
- Unban user
- Hapus akun user
- Lihat sesi aktif user
- Reset password user secara paksa (admin)

### 📊 Analitik & Statistik
- Dashboard overview:
  - Total artikel, user, komentar, views (hari ini vs kemarin)
  - Grafik views harian / mingguan / bulanan
  - Grafik user baru per periode
- Per artikel:
  - Total views, unique views
  - Rata-rata waktu baca
  - Bounce rate
  - Jumlah komentar, like, bookmark, share
- Top 10 artikel paling populer (by views, by komentar, by like)
- Top author (by jumlah artikel, by total views)
- Sumber traffic (referral: Google, sosmed, direct, dll) — integrasi dengan Google Analytics / Umami
- Komentar terbaru (real-time)
- User terbaru yang mendaftar
- Grafik subscriber newsletter
- Export laporan ke CSV / PDF

### ⚙️ Pengaturan Sistem
- Konfigurasi situs:
  - Nama situs, tagline, deskripsi
  - Logo & favicon upload
  - Warna tema utama
  - Bahasa default
- Pengaturan komentar:
  - Aktifkan / nonaktifkan komentar global
  - Moderasi komentar on/off
  - Izinkan komentar tamu (tanpa login) on/off
  - Blacklist kata-kata terlarang
- Pengaturan email:
  - Konfigurasi SMTP / Resend API key
  - Template email (welcome, reset password, notifikasi, newsletter)
  - Test kirim email
- Pengaturan newsletter:
  - Lihat daftar subscriber (export CSV)
  - Kirim newsletter ke semua subscriber
  - Template newsletter
  - Hapus subscriber
- Pengaturan SEO global:
  - Default meta title & description
  - Google Search Console verification code
  - Robots.txt editor
  - Sitemap XML otomatis (auto-regenerate saat ada artikel baru)
- Backup & restore:
  - Backup database manual
  - Jadwal backup otomatis
  - Export semua data ke JSON
- Log aktivitas admin (audit trail — siapa mengubah apa kapan)
- Maintenance mode (tampilkan halaman under maintenance ke user)

---

## ✨ FITUR TAMBAHAN WAJIB

- **Reading time estimator** — hitung & tampilkan estimasi waktu baca per artikel
- **Table of Contents otomatis** — generate dari heading H2 & H3, sticky di sidebar, highlight heading yang sedang dibaca (scroll spy)
- **RSS Feed** — endpoint `/rss.xml` dan `/feed.json`
- **Sitemap XML otomatis** — `/sitemap.xml` yang auto-update
- **robots.txt dinamis**
- **Rate limiting** — pada endpoint login, register, komentar, dan API publik
- **Proteksi spam komentar** — integrasi Akismet atau honeypot
- **View counter real-time** — tampilkan berapa orang sedang baca artikel (gunakan WebSocket atau SSE)
- **Fitur "Baca Nanti"** — simpan artikel ke reading list
- **Copy code button** — otomatis muncul di setiap code block
- **Image lazy loading & blur placeholder**
- **Open Graph image otomatis** — generate OG image dinamis per artikel (pakai Satori atau Vercel OG)
- **Breadcrumb schema markup** — untuk SEO
- **Article schema markup (JSON-LD)** — untuk rich snippet Google
- **Web Vitals monitoring** — Core Web Vitals tracking
- **Error monitoring** — integrasi Sentry
- **API rate limiting & API key** — untuk endpoint publik
- **Webhook** — trigger ke URL eksternal saat artikel baru dipublish

---

## 🔒 KEAMANAN (WAJIB DIIMPLEMENTASIKAN)

- Input sanitization & validasi di semua form (gunakan Zod)
- Proteksi XSS — sanitize HTML konten artikel
- Proteksi CSRF
- SQL Injection protection (Prisma sudah handle, tapi jelaskan)
- Helmet.js untuk HTTP security headers
- Rate limiting per IP (gunakan Redis)
- Upload file validation (tipe file, ukuran maks)
- Environment variable tidak boleh expose ke client
- HTTPS only
- Content Security Policy (CSP)
- Audit dependency vulnerabilities

---

## ⚡ PERFORMA (WAJIB DIIMPLEMENTASIKAN)

- Server-Side Rendering (SSR) untuk halaman artikel (SEO)
- Static Site Generation (SSG) untuk halaman statis
- Incremental Static Regeneration (ISR) untuk artikel
- Image optimization (Next.js Image component)
- Code splitting & lazy loading komponen
- Redis caching untuk: daftar artikel, artikel populer, data yang sering diakses
- Database query optimization (index yang tepat, N+1 query prevention)
- CDN untuk static assets
- Bundle analyzer — cek ukuran bundle
- Lighthouse score target: Performance > 90, Accessibility > 90, SEO > 95

---

## 🧪 TESTING

- Unit test dengan **Vitest** / Jest untuk utility functions & hooks
- Integration test untuk API routes
- E2E test dengan **Playwright** untuk flow utama:
  - Register & login
  - Buat & publish artikel (admin)
  - Komentar pada artikel
  - Bookmark artikel
- Setup CI/CD pipeline dengan GitHub Actions (test otomatis setiap push)

---

## 🚀 DEPLOYMENT

Jelaskan step-by-step cara deploy:
- **Frontend** → Vercel
- **Database** → Railway / Supabase (PostgreSQL)
- **Redis** → Upstash
- **Media** → Cloudinary
- Setup environment variable di Vercel
- Setup custom domain
- Setup CI/CD dengan GitHub Actions
- Monitoring dengan Vercel Analytics + Sentry
- Setup backup otomatis database

---

## 📌 URUTAN PENGERJAAN

Kerjakan secara berurutan:

1. Setup project & environment
2. Setup database & Prisma schema lengkap
3. Setup autentikasi (NextAuth)
4. Fitur manajemen artikel (admin)
5. Fitur tampilan artikel (user)
6. Fitur komentar
7. Fitur profil user
8. Fitur notifikasi
9. Fitur search
10. Dashboard analitik
11. Pengaturan sistem
12. Fitur tambahan (RSS, sitemap, OG image, dll)
13. Keamanan & optimasi performa
14. Testing
15. Deployment

