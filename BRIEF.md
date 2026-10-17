# BRIEF — EsaiCepat — 2026-10-17

## Masalah/usecase (1 kalimat + siapa yang kena)
Pelajar Indonesia yang mendaftar beasiswa sering mentok menulis esai motivasi — tidak tahu strukturnya, kalimatnya kaku, dan rawan mengarang klaim — EsaiCepat memandu lewat 4 template beasiswa (BCA PPTI, LPDP, KIP Kuliah, Umum), merangkai jawaban menjadi draft esai utuh, lalu memindai klaim yang perlu bukti (cek kejujuran), semuanya client-side.

## Konsep visual (1 kalimat)
"Rute kiriman": esai motivasimu adalah bundel kartu pos yang menempuh jalur kereta pos vertikal dari kotamu ke meja panitia — tiap stasiun di satu sumbu timeline adalah satu bagian esai yang ditulis sebagai kartu pos fisik, di ujung rute seluruh kartu disegel jadi satu kiriman berstempel "SIAP DIKIRIM".

## Hasil seed (ringkas, seed.json di workdir + builds/2026-10-17/)
- domain: kartu pos | layout: timeline satu sumbu | referensi: poster film lawas
- batasan: hanya 3 ukuran font (display raksasa / lead / body)
- gerak: A parallax 5 layer + zoom-out di akhir; B marquee vertikal di sisi layar; C scramble/decode; D tilt 3D pointer/gyro; E GSAP Flip layout
- ikon: hand-drawn goyang (feTurbulence), sumber Remix
- font: display Sassy Frass, body Commissioner, aksen Comic Neue
- palet: mid, triadic, baseHue 323 — bg oklch(0.72 0.142 323) pink-magenta, surface oklch(0.60 0.110 323), text oklch(0.16 0.030 323), muted oklch(0.25 0.040 323) [dipergelap dari 0.32 demi AA], accent kuning oklch(0.70 0.199 83), accent2 biru oklch(0.64 0.190 203), pop hijau oklch(0.79 0.212 165)

## 3 arah desain (2 kalimat) + terpilih
1. Kantor pos retro penuh (meja, perangko, cap): hangat tapi TABRAKAN dengan BidCepat kemarin (domain kartu pos + referensi poster film lawas sama). Dibuang.
2. Naskah film: esai sebagai screenplay, tiap bagian = satu adegan dengan slugline. Kuat untuk referensi poster film, tapi teks-heavy dan sumbu timeline jadi tempelan.
3. Rute kiriman kartu pos (TERPILIH): timeline satu sumbu = jalur rel; tiap bagian esai = kartu pos fisik yang bisa di-tilt; referensi poster film lawas hanya hidup di tipografi judul raksasa (title card). Paling jauh dari default dan dari build kemarin — kemarin "kantor", ini "perjalanan".

## Keputusan berani
Tidak ada hero marketing dan tidak ada navbar — pengunjung langsung "naik kereta pos": judul title-card raksasa + satu tombol "Mulai tulis kartu pertama". Navigasi = rel progres di sisi layar. Di ujung rute, kamera zoom-out menampilkan seluruh perjalanan sebagai peta.

## Persona/suara
"Mas Pos, editor esai": tukang pos senior yang teliti dan menyemangati. Menyapa "Halo, Dek!". Copy tombol: "Tulis kartu ini", "Segel jadi esai", "Salin kiriman". Error membantu: "Nama masih kosong — panitia perlu tahu siapa pengirimnya." Tidak memuji berlebihan, tegas soal kejujuran: "Klaim tanpa bukti = kiriman ditolak panitia."

## Palet (harmoni triadic, mid, hue 323)
- Token OKLCH final: --bg oklch(0.72 0.142 323); --surface oklch(0.60 0.110 323); --text oklch(0.16 0.030 323); --muted oklch(0.25 0.040 323); --accent oklch(0.70 0.199 83) (kuning); --accent-2 oklch(0.64 0.190 203) (biru); --pop oklch(0.79 0.212 165) (hijau, <5%).
- Psikologi: pink-magenta terang = kertas surat yang berani + semangat muda; kuning = stempel/cap; biru = tinta kepercayaan; hijau = stempel "lolos".
- Cek kontras AA: text/bg ≈ 7.8:1; muted(0.25)/bg ≈ 5.5:1; teks gelap di atas accent kuning/biru ≥ 4.5:1. Kuning & hijau tidak dipakai untuk teks kecil.
- Proporsi 60-30-10: pink dominan, surface/kartu krem-pink, aksen kuning-biru-hijau.

## Font (display/body/aksen)
- Display: Sassy Frass (script retro ala title card film lawas) — hanya untuk judul raksasa & stempel.
- Body: Commissioner (grotesque bersih, variable) — semua teks baca; lolos uji 3 baris di 390px.
- Aksen: Comic Neue (tulisan tangan) — label kartu pos, coretan Mas Pos, stempel.
- Batasan seed: HANYA 3 ukuran — display clamp(3.5rem, 14vw, 10rem), lead 1.35rem, body 1rem. Semua elemen memakai tiga ini.
- Id Fontsource: sassy-frass, commissioner, comic-neue — via Astro Fonts API (self-host, subset latin).

## Ikon (gaya hand-drawn goyang, sumber Remix via astro-icon `ri:...`)
12+: ri:mail-line, ri:send-plane-line, ri:quill-pen-line, ri:file-text-line, ri:shield-check-line, ri:search-eye-line, ri:copyleft-line (ganti: ri:file-copy-line), ri:download-line, ri:save-line, ri:share-line, ri:map-pin-line, ri:train-line, ri:stamp-line (cek icons.json; fallback custom), ri:checkbox-circle-line, ri:alert-line, ri:lightbulb-line, ri:edit-line, ri:arrow-down-line. Custom (3+): perangko (rect + perforasi), cap pos lingkaran teks melengkung "SIAP DIKIRIM", rel kereta (garis + bantalan) — SVG inline dengan filter feTurbulence goyang.

## Gerak (kategori A-F; narasi: naik kereta pos mengantar kiriman)
- A kamera: hero 5 layer parallax (grain, judul, kartu melayang, awan, rel) + zoom-out di stasiun akhir (peta rute).
- B marquee: 2 band vertikal di sisi layar (desktop) — kiri kata "TULIS • KIRIM • LOLOS •", kanan lubang sprocket strip film; kecepatan terikat velocity scroll + skew.
- C teks: scramble/decode pada judul hero & judul tiap stasiun saat masuk viewport.
- D input: tilt 3D pada kartu pos mengikuti pointer (gyro di HP); hover kartu template = angkat.
- E reveal: Flip saat ganti template beasiswa (kartu bertukar posisi); reveal garis rel yang "digambar" (draw-on) antar stasiun.
- MODE RINGAN (hardwareConcurrency ≤4 / Save-Data / FPS <40 2 dtk): matikan parallax layer 3-5 + tilt + marquee gerak (jadi statis), sisakan reveal & Flip.
- Dipangkas bila waktu mepet: F (tidak dipakai); urutan pangkas: D gyro → B skew → A layer 4-5.

## Storyboard hero moment
| Scroll | Terlihat | Kamera | Marquee | Teks | Interaksi |
|---|---|---|---|---|---|
| 0% | Title card "ESAICEPAT" raksasa + kartu pos melayang + CTA "Mulai tulis kartu pertama" | parallax 5 layer | band vertikal jalan | scramble judul | CTA scroll ke Stasiun 1 |
| 25% | Stasiun 1: pilih template beasiswa (4 kartu) | pan turun | — | scramble judul stasiun | klik kartu → Flip |
| 50% | Stasiun 2: tulis kartu pos (7 kartu form, tilt) | — | band kiri | — | isi form, "Isi contoh" |
| 75% | Stasiun 3: cek kejujuran (flag + checklist) | — | band kanan | — | centang bukti |
| 100% | Stasiun 4: hasil kiriman + stempel; zoom-out peta rute + FAQ + arsip | zoom-out | — | — | salin/unduh/simpan/bagikan |

Pertunjukan utama: hero title-card — judul script raksasa yang ter-scramble lalu terbentuk, kartu pos melayang dengan parallax, tombol CTA dalam 3 detik.

## Konten (15+ item nyata)
- 4 template beasiswa: BCA PPTI (fokus: prestasi akademik + rencana kontribusi), LPDP (kontribusi untuk Indonesia, rencana studi S2), KIP Kuliah (keterbatasan ekonomi + tekad), Umum (struktur esai motivasi standar) — masing-masing: 6 bagian, target kata per bagian, 1 tips khas.
- 7 kartu form: nama & beasiswa tujuan, pembuka, latar belakang, motivasi, prestasi (opsional), rencana studi, kontribusi, penutup — dengan hint + contoh isi per field.
- 8 pola flag cek kejujuran (regex): "juara 1", "olimpiade internasional", "terbaik se-", "IPK 4.0/sempurna", angka prestasi tanpa konteks, "diterima di semua", klaim bahasa ("fasih 5 bahasa"), "tidak pernah gagal".
- 6 checklist kejujuran: tiap klaim prestasi ada bukti; angka bisa diverifikasi; tidak mengarang organisasi; tidak menjiplak; kutipan diberi sumber; siap ditanya saat wawancara.
- FAQ 5: apakah gratis; data tersimpan di mana (localStorage, tidak dikirim ke server); apakah esai hasil generator boleh langsung dikirim (tidak — ini DRAFT, wajib revisi); template dari mana (struktur umum esai beasiswa, [ISI MANUAL] bila butuh detail resmi); cara bagikan link.
- Easter egg: ketik "lolos" → stempel hijau "LOLOS SELEKSI BERKAS!" jatuh menimpa layar.

## Teknik visual orisinal (2+)
1. Filter SVG feTurbulence + feDisplacementMap "goyang tangan" yang diterapkan ke SEMUA ikon Remix + divider — satu gaya visual kohesif.
2. Kartu pos fisik: rect + perforasi (pattern lingkaran) + perangko custom + cap lingkaran teks melengkung, dengan bayangan kertas dan tilt 3D.
3. Rel kereta vertikal sebagai sumbu timeline: garis + bantalan (ties) yang digambar via draw-on saat scroll; stasiun = simpul bulat bernomor.

## Suara
Tidak (default mute, bukan kewajiban).

## Fungsi (v2 FASE 1)
- Pilih template → struktur bagian + target kata + tips tampil (Flip).
- Form 7 kartu pos → validasi per field (pesan spesifik ala Mas Pos), tombol "Isi contoh", simpan otomatis ke localStorage (key `esaicepat:v1`, try/catch + cek skema).
- "Segel jadi esai" → rakit draft dari template + jawaban (tanpa innerHTML — textContent/escape), hitung kata per bagian & total, tampilkan preview.
- Cek kejujuran → scan regex → daftar flag "perlu bukti" + checklist 6 item (state tersimpan).
- Salin (clipboard + fallback textarea), Unduh .txt, Simpan draft bernama (multi-draft), arsip draft (muat/hapus), Bagikan link deep-link `?s=<base64url>` (validasi panjang ≤ 4000, try/catch).
- Empty state (belum ada jawaban), loading state ("mesin segel bekerja…"), error state didesain.
- Tanpa backend (100% client-side, static Astro). Tombol CTA utama terlihat < 3 detik.
