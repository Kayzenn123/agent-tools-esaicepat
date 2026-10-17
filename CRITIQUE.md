# CRITIQUE — EsaiCepat — 2026-10-17

## Slop test (v3) + 3 hal paling template + yang dirombak
Slop test: logo ditutup — pink-magenta triadic + judul script Sassy Frass raksasa + rel vertikal
+ marquee sprocket film di sisi + kartu pos berperforasi. Tidak ketuker dengan BidCepat kemarin
(hijau ledger, spreadsheet UI, kantor pos) maupun web AI generik. Lolos.

3 hal paling template:
1. Section FAQ memakai widget AstroWind apa adanya — tipografi & kartu accordion default, kontras
   dengan bahasa visual kartu pos di sekitarnya.
2. Blok CallToAction generik ("Kartunya sudah lengkap?") — pola SaaS yang di-blacklist v3.
3. Kertas hasil esai polos — kotak bordered biasa, belum terasa seperti "kiriman disegel".

Rombak (2 dari 3):
1. FAQ dibungkus kepala stasiun (station-dot + label tangan "pos tanya jawab") + container max-w-5xl
   sejajar stasiun lain — widget tetap dipakai (aturan use-widgets), tapi diberi bingkai konsep.
2. Kertas hasil esai diberi 2 strip "segel" (lakban miring aksen kuning/biru di sudut) + label
   tangan "disegel oleh Mas Pos".
3. CTA generik DIGANTI: bukan section CallToAction, melainkan peta rute zoom-out (#ujung) sebagai
   penutup — keputusan berani tetap terjaga.

## Gerbang gerak (v4): jumlah lapisan, zoom, pan, 2 marquee, FPS 4x (angka)
- Lapisan: A parallax 5 layer + zoom-out peta akhir, B 2 marquee vertikal (kata + sprocket),
  C scramble/decode, D tilt 3D pointer/gyro, E Flip pilih template + reveal. = 5 lapisan, 5 kategori.
- Zoom: ada (zoom-out #ujung). Pan horizontal: TIDAK — seed camera ("parallax 5 layer + zoom out di akhir")
  tidak memuat pan; rute vertikal memang konsepnya. Dicatat sebagai keputusan seed, bukan pelanggaran.
- 2 marquee: ya, arah berlawanan, skew terikat velocity scroll.
- FPS 4x CPU throttle: 49.7 (rerun 49.9/53.7 → stabil ≥45 setelah wobble dihapus dari elemen marquee).
- Font/palet/ikon beda dari 7 build terakhir: ya (Sassy Frass/Commissioner/Comic Neue; mid/triadic hue 323;
  hand-drawn Remix — pick-seed lolos anti-seragam).
- Kontras AA: text/bg 7.39, muted/bg 6.14, teks di aksen kuning 7.24, biru 6.94, surface 4.69 — semua lolos.
- Reduced-motion: 0 animasi berjalan (qa.cjs). Toggle "Gerak: nyala/mati" tersedia + MODE RINGAN otomatis.

## Gerbang v5: tes bandingkan, blur, 3 detik, keyboard-only, reduced-motion, mode ringan
- Bandingkan vs BidCepat (kemarin): palet, font, layout, domain-interpretasi, gerak — 5/5 beda. Tidak sekeluarga.
- Blur: judul script raksasa + rel tengah + band sisi tetap terbaca sebagai identitas unik.
- 3 detik: "EsaiCepat" + "Naik kereta pos" + kartu pos — jelas ini tool esai beasiswa.
- Keyboard-only: semua fungsi via button/input/link native; skip link ada; rail = anchor nav;
  tidak ada fungsi yang hanya lewat hover (tilt = enhancement).
- Reduced-motion: lolos (0 animasi). Mode ringan: lolos (otomatis + toggle manual).
- Budget (gzip): JS 7.8KB, CSS 20.7KB, font 132KB, 0 gambar raster. LCP/CLS/INP: lihat Lighthouse.
- Lisensi: font OFL, ikon Apache-2.0, template MIT — kredit di README. Keamanan: data user tidak
  via innerHTML (textContent/createElement); `?s=` divalidasi (try/catch, cap 4000 char, cek tipe);
  localStorage try/catch + cek skema versi; tanpa secret.

## Budget performa + Lighthouse (mobile/desktop)
- Mobile: Performance 75 / Accessibility 100 / Best Practices 100 / SEO 100
- Desktop: 97 / 100 / 100 / 100
- Catatan: plafon VM (CPU throttle emulasi berat; pola sama di build kemarin 74–75). Tidak ada
  blocking resource yang bisa dipangkas lagi (JS 7.8KB gzip, font subset latin).

## Keamanan + lisensi
Lolos (lihat atas). Tidak ada klaim fakta eksternal — contoh esai & tips ditulis manual, FAQ menyatakan
template = panduan struktur bukan bocoran soal, dan hasil = DRAFT yang wajib direvisi (R7/R8 aman).

## Skor 1-10: karakter, keunikan, kerapian
- Karakter: 9 — "rute kiriman kartu pos" konsisten dari hero sampai peta akhir; suara Mas Pos di semua copy.
- Keunikan: 8 — beda total dari build kemarin; minus 2 karena domain seed "kartu pos" sama dengan kemarin
  (lolos cek mekanis 4/5 sumbu, tapi domainnya kembar).
- Kerapian: 8 — hero & stasiun rapi; minus 2 untuk CTA generik yang diganti peta (sudah dirombak).

## Keputusan konflik aturan (kalau ada) + daftar dipangkas
- Konflik: v4 ATURAN 6 menanyakan pan horizontal — tidak dipakai karena seed camera tidak memuatnya;
  seed mengikat (v4 ATURAN 0). Dicatat di sini.
- Dipangkas: tidak ada lapisan gerak yang dipangkas; F memang tidak dipakai sesuai rencana.

## Putaran rombak ke-1 dan ke-2
- Putaran 1 (pre-deploy): hero mobile (lingkaran parallax menabrak eyebrow → hidden di <sm;
  kartu pos hero salah posisi karena `.postcard{position:relative}` mengalahkan `.absolute` →
  dibungkus wrapper absolute); tap target 44px (checkbox 44px, rail link min-height 44px);
  wobble dihapus dari 56 elemen marquee (FPS 41.7 → 49.9).
- Putaran 2 (kritik): FAQ diberi kepala stasiun; kertas esai diberi strip segel; CTA generik
  diganti peta rute zoom-out sebagai penutup.
