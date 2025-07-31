# Final Task Portfolio Web

Website portfolio interaktif dengan fitur input project dan pengalaman kerja, dibangun menggunakan Node.js, Express, PostgreSQL, Multer, dan Handlebars.

## Fitur

- **Landing Page**: Menampilkan profil, tech stack, pengalaman kerja, dan daftar project.
- **Form Input Project**: Tambah project baru beserta gambar, deskripsi, teknologi, dan link GitHub.
- **Form Experience**: Tambah pengalaman kerja dengan logo perusahaan, posisi, periode, deskripsi, dan teknologi.
- **Upload Gambar**: Mendukung upload gambar untuk project dan logo perusahaan.
- **Dark Mode**: Tampilan bisa berganti mode gelap/terang.
- **Responsive**: Desain responsif untuk desktop & mobile.

## Struktur Folder

```
index.js
index.html
package.json
public/
  image/
  script/
  uploads/
views/
  contact.handlebars
  home.handlebars
  input.handlebars
```

## Instalasi

1. **Clone repo & install dependencies**
   ```sh
   npm install
   ```

2. **Konfigurasi Database**
   - Pastikan PostgreSQL berjalan.
   - Buat database `final_project` dan tabel:
     ```sql
     CREATE TABLE form_project (
       id SERIAL PRIMARY KEY,
       project_name VARCHAR(255),
       description TEXT,
       technologies TEXT[],
       github VARCHAR(255),
       image_url VARCHAR(255)
     );

     CREATE TABLE experience (
       id SERIAL PRIMARY KEY,
       position VARCHAR(255),
       location VARCHAR(255),
       description TEXT,
       start_date DATE,
       end_date DATE,
       technologies TEXT[],
       logo VARCHAR(255)
     );
     ```

3. **Jalankan Server**

   nodemon index.js

   atau pm2 start index.js --name myproject

4. **Akses Website**
   Buka [http://localhost:3000](http://localhost:3000) di browser.

## Penggunaan

- **Tambah Project**: Menuju `/input`, isi form project.
- **Tambah Experience**: Menuju `/input`, isi form experience.
- **Kontak**: Menuju `/contact` untuk mengirim pesan.

## Stack Teknologi

- Node.js
- Express.js
- PostgreSQL
- Multer (upload file)
- Express-Handlebars (template engine)
- Tailwind CSS (CDN)
- Font Awesome (ikon)

## Author

Ferdi Alfiansah

---

> © 2025 coded by Ferdi Alfiansah