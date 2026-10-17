// Data EsaiCepat — template beasiswa, pola cek kejujuran, FAQ.
// Semua copy Bahasa Indonesia, suara "Mas Pos, editor esai".

export interface Answers {
  nama: string;
  tujuan: string;
  pembuka: string;
  latar: string;
  motivasi: string;
  prestasi: string;
  rencana: string;
  kontribusi: string;
  penutup: string;
}

export interface EssaySection {
  id: keyof Answers;
  station: string;
  title: string;
  hint: string;
  example: string;
  minWords: number;
  maxWords: number;
  optional?: boolean;
}

export interface ScholarshipTemplate {
  id: string;
  name: string;
  tagline: string;
  tip: string;
  framing: string;
}

export const SECTIONS: EssaySection[] = [
  {
    id: 'pembuka',
    station: 'Kartu 1 — Pembuka',
    title: 'Salam pembuka',
    hint: 'Satu-dua kalimat: siapa kamu dan untuk apa surat ini ditulis.',
    example: 'Perkenalkan, saya Nisa Rahma, siswi kelas 12 SMA Negeri 1 Kadugede. Surat ini saya tulis untuk mengajukan Beasiswa BCA PPTI 2026.',
    minWords: 15,
    maxWords: 60,
  },
  {
    id: 'latar',
    station: 'Kartu 2 — Latar belakang',
    title: 'Latar belakang',
    hint: 'Ceritakan keluargamu dan perjalanan sekolahmu sejauh ini. Jujur saja — panitia menghargai cerita nyata.',
    example: 'Saya anak kedua dari tiga bersaudara. Ayah bekerja sebagai buruh tani dan ibu membuka warung kecil di depan rumah. Sejak SMP saya terbiasa membantu warung sepulang sekolah sambil mempertahankan nilai di peringkat lima besar kelas.',
    minWords: 30,
    maxWords: 150,
  },
  {
    id: 'motivasi',
    station: 'Kartu 3 — Motivasi',
    title: 'Motivasi memilih jurusan',
    hint: 'Kenapa jurusan ini? Hubungkan dengan pengalaman nyata, bukan alasan umum seperti "prospek kerja bagus".',
    example: 'Saya memilih jurusan Sistem Informasi karena sejak kelas 10 saya membuatkan sistem pencatatan sederhana untuk warung ibu memakai spreadsheet. Dari situ saya sadar teknologi bisa menyelesaikan masalah nyata orang-orang di sekitar saya.',
    minWords: 30,
    maxWords: 150,
  },
  {
    id: 'prestasi',
    station: 'Kartu 4 — Prestasi',
    title: 'Prestasi & pengalaman',
    hint: 'Tulis prestasi atau pengalaman organisasi yang BENAR-BENAR kamu alami dan bisa dibuktikan. Boleh dikosongkan.',
    example: 'Juara 2 lomba karya tulis ilmiah tingkat kabupaten (2024), anggota OSIS divisi humas, dan relawan pengajar di TPQ desa setiap akhir pekan.',
    minWords: 0,
    maxWords: 120,
    optional: true,
  },
  {
    id: 'rencana',
    station: 'Kartu 5 — Rencana studi',
    title: 'Rencana selama kuliah',
    hint: 'Apa yang akan kamu lakukan selama kuliah? Buat konkret: target IPK, organisasi, proyek.',
    example: 'Selama kuliah saya menargetkan IPK di atas 3,50, aktif di himpunan jurusan, dan membangun portofolio tiga proyek aplikasi — salah satunya sistem kasir gratis untuk UMKM di desa saya.',
    minWords: 25,
    maxWords: 120,
  },
  {
    id: 'kontribusi',
    station: 'Kartu 6 — Kontribusi',
    title: 'Rencana kontribusi',
    hint: 'Setelah lulus, apa yang akan kamu berikan kembali? Panitia beasiswa mencari penerima yang memberi dampak.',
    example: 'Setelah lulus, saya ingin kembali ke daerah dan membantu digitalisasi UMKM — dimulai dari koperasi tani tempat ayah saya bekerja — agar pencatatan mereka rapi dan akses pasarnya meluas.',
    minWords: 25,
    maxWords: 120,
  },
  {
    id: 'penutup',
    station: 'Kartu 7 — Penutup',
    title: 'Penutup & harapan',
    hint: 'Tutup dengan sopan: terima kasih + harapan. Satu-dua kalimat cukup.',
    example: 'Demikian surat motivasi ini saya tulis dengan sejujurnya. Besar harapan saya diberi kesempatan menjadi bagian dari penerima beasiswa ini. Atas perhatiannya, saya ucapkan terima kasih.',
    minWords: 15,
    maxWords: 60,
  },
];

export const TEMPLATES: ScholarshipTemplate[] = [
  {
    id: 'bca',
    name: 'BCA PPTI',
    tagline: 'Program Pendidikan Teknik Informatika — ikatan dinas BCA',
    tip: 'PPTI mencari calon yang tekun dan siap ikatan dinas. Tonjolkan kedisiplinan, prestasi akademik, dan kesiapan mengikuti program asrama/pembinaan.',
    framing: 'Beasiswa BCA PPTI',
  },
  {
    id: 'lpdp',
    name: 'LPDP',
    tagline: 'Beasiswa Pascasarjana — kontribusi untuk Indonesia',
    tip: 'LPDP menilai rencana kontribusi untuk Indonesia. Buat bagian kontribusi paling kuat: masalah nyata apa yang akan kamu selesaikan sepulang studi?',
    framing: 'Beasiswa LPDP',
  },
  {
    id: 'kip',
    name: 'KIP Kuliah',
    tagline: 'Bantuan biaya pendidikan untuk keluarga kurang mampu',
    tip: 'KIP Kuliah fokus pada keterbatasan ekonomi dan tekad. Ceritakan kondisi keluarga dengan jujur dan tunjukkan bahwa keterbatasan justru jadi bahan bakarmu.',
    framing: 'KIP Kuliah',
  },
  {
    id: 'umum',
    name: 'Umum',
    tagline: 'Struktur esai motivasi standar untuk beasiswa apa pun',
    tip: 'Template umum mengikuti struktur esai beasiswa yang paling sering diminta: pembuka, latar, motivasi, rencana, kontribusi, penutup. Sesuaikan nama beasiswanya di kartu tujuan.',
    framing: 'beasiswa tujuanmu',
  },
];

export interface HonestyFlag {
  pattern: RegExp;
  label: string;
  advice: string;
}

export const HONESTY_PATTERNS: HonestyFlag[] = [
  { pattern: /juara\s*(1|satu)\b/i, label: 'Klaim "juara 1"', advice: 'Pastikan ada sertifikat/piagamnya. Tulis tingkatnya (sekolah/kabupaten/provinsi/nasional) — jangan biarkan pembaca menebak.' },
  { pattern: /olimpiade\s*internasional|tingkat\s*internasional/i, label: 'Klaim level internasional', advice: 'Klaim internasional paling sering dicek. Siapkan bukti resmi (surat undangan, sertifikat penyelenggara).' },
  { pattern: /terbaik\s*se-?(indonesia|nasional|provinsi|kabupaten|kota|sekolah)/i, label: 'Klaim "terbaik se-…"', advice: 'Superlatif butuh sumber. Kalau tidak ada dokumen pendukungnya, turunkan jadi fakta spesifik yang bisa dibuktikan.' },
  { pattern: /\bIPK\s*4[,.]0+\b|IPK\s*sempurna|nilai\s*sempurna/i, label: 'Klaim nilai sempurna', advice: 'IPK 4,00 atau "sempurna" mudah diverifikasi lewat transkrip. Pastikan angkanya persis — pembulatan ke atas berisiko.' },
  { pattern: /\b\d+\s*(penghargaan|medali|piala|juara)\b/i, label: 'Angka prestasi tanpa konteks', advice: 'Angka butuh konteks: kapan, di mana, penyelenggara siapa. "5 penghargaan" tanpa detail terlihat seperti karangan.' },
  { pattern: /fasih\s*\d+\s*bahasa|menguasai\s*\d+\s*bahasa/i, label: 'Klaim menguasai banyak bahasa', advice: 'Siap diuji saat wawancara. Tulis level yang sebenarnya (mis. "bahasa Inggris pasif") daripada "fasih".' },
  { pattern: /diterima\s*di\s*semua|tidak\s*pernah\s*gagal|selalu\s*juara/i, label: 'Klaim tanpa cela', advice: 'Tidak ada yang sempurna — panitia tahu itu. Klaim "tidak pernah gagal" justru menurunkan kepercayaan.' },
  { pattern: /ketua\s*(osis|bem|himpunan|organisasi)/i, label: 'Klaim jabatan organisasi', advice: 'Jabatan mudah dikonfirmasi ke sekolah/kampus. Tulis periode jabatannya agar terlihat konkret dan jujur.' },
];

export const HONESTY_CHECKLIST: { id: string; text: string }[] = [
  { id: 'h1', text: 'Setiap prestasi yang saya tulis ada buktinya (sertifikat, piagam, atau surat keterangan).' },
  { id: 'h2', text: 'Angka yang saya tulis (IPK, peringkat, tahun) persis dan bisa diverifikasi.' },
  { id: 'h3', text: 'Saya tidak mengarang pengalaman organisasi atau kepanitiaan.' },
  { id: 'h4', text: 'Saya tidak menjiplak contoh esai — kalimatnya saya tulis sendiri.' },
  { id: 'h5', text: 'Kutipan atau data dari sumber lain saya beri atribusi yang jelas.' },
  { id: 'h6', text: 'Saya siap menjelaskan setiap kalimat esai ini jika ditanya saat wawancara.' },
];

export const FAQS: { title: string; description: string }[] = [
  {
    title: 'Apakah EsaiCepat gratis?',
    description:
      'Gratis, tanpa akun, tanpa batas. Seluruh tool berjalan di browser (client-side) — tidak ada server yang perlu dibayar, jadi tidak ada biaya yang dibebankan ke kamu.',
  },
  {
    title: 'Di mana data tulisanku tersimpan?',
    description:
      'Hanya di localStorage browser perangkatmu — tidak dikirim ke server mana pun, tidak dibaca siapa pun. Kalau kamu hapus data browser, draft ikut hilang. Untuk arsip penting, unduh file .txt-nya.',
  },
  {
    title: 'Bolehkah esai hasil generator langsung dikirim ke panitia?',
    description:
      'Jangan. Ini DRAFT, bukan esai final — tugasnya membantumu mulai dari halaman kosong dan merapikan struktur. Baca ulang, ubah dengan bahasamu sendiri, dan pastikan setiap kalimatnya benar-benar mewakili dirimu sebelum dikirim.',
  },
  {
    title: 'Template beasiswanya disusun dari mana?',
    description:
      'Dari struktur esai motivasi yang umum diminta panitia beasiswa (latar, motivasi, rencana, kontribusi). Ini panduan struktur, bukan bocoran soal — syarat resmi tiap beasiswa bisa berubah, jadi selalu cek halaman resmi penyelenggaranya.',
  },
  {
    title: 'Bagaimana cara membagikan draft ke orang lain?',
    description:
      'Pakai tombol "Salin link kiriman" — jawabanmu dikodekan ke dalam URL (parameter s=), jadi siapa pun yang membuka link akan melihat formulir terisi sama. Jangan bagikan link berisi data pribadi sensitif ke orang asing.',
  },
];

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function buildEssay(a: Answers, t: ScholarshipTemplate): { title: string; body: string }[] {
  const nama = a.nama.trim() || '[Nama kamu]';
  const tujuan = a.tujuan.trim() || t.framing;
  const parts: { title: string; body: string }[] = [];
  const push = (title: string, body: string) => {
    if (body.trim()) parts.push({ title, body: body.trim() });
  };
  push(
    'Pembuka',
    `${a.pembuka.trim() || `Perkenalkan, saya ${nama}. Surat ini saya tulis untuk mengajukan ${tujuan}.`}`
  );
  push('Latar Belakang', a.latar.trim());
  push('Motivasi', a.motivasi.trim());
  if (a.prestasi.trim()) push('Prestasi & Pengalaman', a.prestasi.trim());
  push('Rencana Studi', a.rencana.trim());
  push('Kontribusi', a.kontribusi.trim());
  push('Penutup', a.penutup.trim() || 'Demikian surat motivasi ini saya tulis dengan sejujurnya. Atas perhatian dan kesempatannya, saya ucapkan terima kasih.');
  return parts;
}

export function essayToText(a: Answers, t: ScholarshipTemplate): string {
  const nama = a.nama.trim() || '[Nama kamu]';
  const tujuan = a.tujuan.trim() || t.framing;
  const lines = [
    'ESAI MOTIVASI',
    `${tujuan}`,
    `— ${nama}`,
    '',
    ...buildEssay(a, t).flatMap((p) => [p.title.toUpperCase(), '', p.body, '']),
  ];
  return lines.join('\n').trim() + '\n';
}
