# Panduan Instalasi Lokal BoBlog

Selamat datang di panduan instalasi lokal untuk project BoBlog. Aplikasi ini dibangun menggunakan stack modern:
- **Framework Frontend/Backend:** Astro.js (SSR Mode)
- **Database ORM:** Prisma
- **Database:** Supabase (PostgreSQL)
- **Autentikasi:** Lucia Auth
- **Styling:** Tailwind CSS (v4) & DaisyUI
- **Editor Artikel:** TipTap
- **Lainnya:** React, dsb.

Panduan ini akan memandu Anda untuk menyiapkan *environment* proyek dari hasil *clone* atau unduhan awal hingga berjalan dengan baik di komputer lokal Anda.

---

## 1. Persiapan Kebutuhan Server & Tools

Pastikan komputer/laptop Anda telah terinstal daftar alat di bawah ini sebelum melanjutkan:
- **Node.js**: Sebaiknya gunakan versi LTS (Direkomendasikan **Node.js v20.x** atau **v22.x**). *(Catatan: Hindari Node v25 karena berstatus nightly dan tidak didukung penuh oleh platform hosting seperti Vercel saat ini).*
- **NPM** (Node Package Manager) yang terpasang bersamaan dengan instalasi Node.js.
- **Git** (Opsional tapi sangat disarankan) untuk *version control*.
- **Database Supabase**: Anda memerlukan akun [Supabase](https://supabase.com/) gratis atau *database* PostgreSQL lokal/cloud lainnya. 

---

## 2. Instalasi Dependensi (Package)

Buka terminal/command prompt lalu arahkan ke *root directory* dari project ini.
Jalankan perintah berikut untuk mengunduh semua package yang diperlukan project (seperti React, Astro, Tailwind, dll):

```bash
npm install
```

Tunggu hingga seluruh pustaka (*library*) selesai diunduh. Jika muncul peringatan kecil (*warnings*), umumnya hal itu aman diabaikan.

---

## 3. Konfigurasi Environment Variables

Buka file `.env.example` (jika ada) dan salin isinya, lalu buat file baru bernama `.env` di direktori yang sama (tumpukan paling luar/root aplikasi). Anda juga bisa langsung membuat file bernama `.env` jika belum ada.

Tambahkan dua variabel inti untuk menghubungkan Prisma ke Database Supabase Anda ke dalam file `.env`:

```env
# Koneksi Prisma
DATABASE_URL="postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"
```

**Panduan mendapatkan URL dari Supabase:**
1. Masuk ke dashboard proyek Supabase Anda.
2. Klik menu ikon **Settings** -> **Database**.
3. Gulir ke bawah hingga bagian **Connection string**.
4. Pilih tab **URI**.
5. Jangan lupa untuk mengganti nilai `[PASSWORD]` dengan kata sandi asli dari *database/dashboard* Supabase Anda.
6. Biasanya `DATABASE_URL` menggunakan Session pooling (`/?pgbouncer=true`) dan `DIRECT_URL` berupa URL original.

---

## 4. Inisialisasi Database (Prisma)

Setelah `.env` disiapkan, sekarang Anda perlu menyelaraskan *schema* (skema struktur) *database* aplikasi ke *database* di Supabase serta menginisialisasi *client* Prisma.

Jalankan serangkaian perintah ini:

**Mendorong Skema ke Remote Database**
```bash
npx prisma db push
```
*Tunggu hingga proses selesai. Perintah ini akan secara otomatis membuat tabel-tabel seperti Users, Article, Comments, dsb. yang sudah dikonfigurasi di `prisma/schema.prisma`.*

**Membuat Akun Admin Pertama (Seeding)**
Agar Anda bisa langsung mencoba fitur Admin Panel bawaan project ini (seperti membuat artikel baru, dsb), Anda harus melakukan seeding awal (jika database masih kosong):
```bash
npx prisma db seed
```
*Tindakan ini akan membuat akun admin *default* dengan username `admin` dan password `password`.* (Catatan: periksa dan sesuaikan pada file `prisma/seed.ts`).

---

## 5. Menjalankan Server Lokal (Development)

Sekarang sistem telah siap dikembangkan dan dieksplorasi.
Jalankan perintah ini:

```bash
npm run dev
```

Anda akan melihat *output* dari CLI Astro bahwa server lokal sudah berjalan dengan sukses. Buka tautan yang muncul di terminal menggunakan web browser Anda (biasanya `http://localhost:4321`). 

### Akses yang Bisa Digunakan:
- Halaman Publik (Astro HTML/React Front-end): `http://localhost:4321/`
- Dashboard User Login: `http://localhost:4321/dashboard`
- Dashboard Administrator: `http://localhost:4321/admin`

> **Note**: Gunakan akun *development* yang sudah dibuat lewat seeding Prisma (sebelumnya) untuk mengakses bagian admin aplikasi. 

---

## 6. Pengecekan Type & Linting (Opsional)

Project ini menggunakan TypeScript. Jika Anda melakukan perubahan kode di kemudian hari, sangat disarankan untuk melakukan *compile checking* memastikan validitas kode dengan menggunakan perintah:

```bash
npx astro check
# atau
npm run check # Jika script 'check' ada di package.json
```

---

## 7. Build untuk Produksi

Jika Anda sudah merasa puas dan ingin menaikkan status proyek (misalnya deploy untuk server), *build project* terlebih dahulu dengan:

```bash
npm run build
```
Astro SSR membutuhkan file build agar bisa berfungsi di lingkungan seperti Vercel, Node, atau Docker/Hosting konvensional lain. 

Selamat mencoba! Anda kini sudah berhasil melakukan instalasi project BoBlog menggunakan Astro.js dan Supabase!
