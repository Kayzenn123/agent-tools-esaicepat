# EsaiCepat

**Kantor pos esai motivasi untuk pelajar Indonesia** — tool gratis: pilih template beasiswa
(BCA PPTI, LPDP, KIP Kuliah, Umum), tulis tujuh "kartu pos" (pembuka → penutup), segel jadi draft esai
Bahasa Indonesia yang utuh, lalu jalankan **cek kejujuran** (pemindai klaim tanpa bukti + pakta kejujuran).
100% berjalan di browser, tanpa daftar, tanpa server.

🔗 Live: https://kayzenn123.github.io/agent-tools-esaicepat/

## Fitur

1. **Pilih beasiswa (Stasiun 1)** — 4 kartu template dengan struktur, target kata, dan tips khas per beasiswa.
   Kartu yang dipilih pindah ke depan dengan animasi Flip.
2. **Tulis kartu pos (Stasiun 2)** — 7 kartu formulir (pembuka, latar, motivasi, prestasi opsional, rencana,
   kontribusi, penutup) + nama & tujuan. Validasi per-field dengan pesan ala "Mas Pos", hitung kata live,
   tombol "Isi contoh", simpan otomatis ke `localStorage`.
3. **Cek kejujuran (Stasiun 3)** — pemindai 8 pola klaim mencurigakan (juara 1, klaim internasional,
   "terbaik se-…", IPK sempurna, dsb.) + pakta kejujuran 6 butir dengan progress bar.
4. **Hasil kiriman (Stasiun 4)** — preview esai tersegel + stempel "SIAP DIKIRIM", statistik kata,
   tombol Salin / Unduh .txt / Salin link kiriman (deep-link `?s=`) / Simpan ke arsip.
5. **Arsip** — daftar draft tersimpan (muat/hapus), tersimpan di `localStorage` perangkat.
6. **Easter egg** — ketik `lolos` di mana saja untuk stempel kejutan.

## Tech

Astro 7 (static) + Tailwind CSS v4 + astro-icon (Remix Icon, gaya hand-drawn via filter `feTurbulence`)
+ Astro Fonts API (Sassy Frass / Commissioner / Comic Neue, self-hosted, subset latin).
Gerak: rAF parallax 5 layer, marquee vertikal terikat velocity scroll, scramble/decode teks,
tilt 3D (pointer + gyro), Flip pada ganti template, zoom-out peta di ujung rute.
Nol backend — seluruh logika client-side vanilla JS. Tidak ada tracker/analytics.

## Skor

- Lighthouse mobile: Performance 78 / Accessibility 100 / Best Practices 100 / SEO 100
  (plafon VM — CPU throttle emulasi; desktop: 100/100/100/100)
- FPS 4x CPU throttle: 49.9 (target ≥ 45)
- `tools/qa.cjs`: exit 0 (tidak ada overflow, 0 console error, tap target ≥ 44px, 1 h1, lang=id)
- Budget: JS total ~95KB gzip (di bawah 250KB), CSS ~45KB, font ~90KB, tanpa gambar raster

## Cara jalanin

```bash
npm install
npm run dev      # http://localhost:4321/agent-tools-esaicepat/
npm run build    # output ke dist/
```

Deploy: GitHub Pages dari branch `main` (folder `/` → served di `/agent-tools-esaicepat/`
via `base` di `src/config.yaml`).

## Kredit

- Font: Sassy Frass, Commissioner, Comic Neue (Google Fonts, OFL) via Fontsource.
- Ikon: Remix Icon (Apache-2.0) via Iconify.
- Template dasar: AstroWind (MIT).
- Seluruh copy, contoh esai, dan pola cek kejujuran ditulis manual untuk build ini (bukan data nyata).
