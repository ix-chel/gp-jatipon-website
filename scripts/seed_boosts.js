import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const connectionString = process.env.DATABASE_URL;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const sampleBoosts = [
  {
    slug: 'tetap-berakar-dalam-kasih-2026-09-24',
    title: 'Tetap Berakar dalam Kasih',
    scripture_reference: 'Kolose 2:6-7',
    scripture_text: 'Kamu telah menerima Kristus Yesus, Tuhan kita. Karena itu hendaklah hidupmu tetap di dalam Dia. Hendaklah kamu berakar di dalam Dia dan dibangun di atas Dia, hendaklah kamu bertambah teguh dalam iman yang telah diajarkan kepadamu, dan hendaklah hatimu melimpah dengan syukur.',
    reflection: 'Di tengah hiruk pikuk rutinitas dan tuntutan hidup pemuda masa kini—antara karier, perkuliahan, dan pergaulan—seringkali kita merasa terombang-ambing oleh ekspektasi sekitar. Rasul Paulus mengingatkan jemaat Kolose dan kita semua hari ini: akar yang menghidupkan dan meneguhkan langkah kita bukanlah pencapaian sementara, melainkan persekutuan yang intim dengan Kristus. Ketika akar iman kita menghunjam dalam kebenaran kasih-Nya, badai apa pun yang menerpa tidak akan menumbangkan pengharapan kita.',
    prayer: 'Tuhan Yesus, terima kasih untuk kasih setia-Mu yang tak berkesudahan. Ajarlah kami pemuda GP Jatipon untuk senantiasa berakar teguh di dalam-Mu, tidak mudah goyah oleh rupa-rupa angin pengajaran maupun kecemasan dunia. Penuhilah hati kami dengan ucapan syukur sepanjang hari ini. Amin.',
    author: 'Pdt. Tim Pelayanan GP Jatipon',
    publish_date: '2026-09-24',
    status: 'published',
    cover_image: '/images/gp-community-hero.jpg'
  },
  {
    slug: 'menemukan-damai-di-tengah-badai-2026-09-23',
    title: 'Menemukan Damai di Tengah Badai',
    scripture_reference: 'Filipi 4:6-7',
    scripture_text: 'Janganlah hendaknya kamu kuatir tentang apapun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur. Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.',
    reflection: 'Kekhawatiran seringkali datang tanpa permisi di benak kita. Masa depan, pekerjaan, keluarga, dan relasi kerap menjadi beban berat. Namun, firman Tuhan tidak menyuruh kita memendamnya sendiri. Kita diundang untuk menukar kecemasan kita dengan damai sejahtera Allah melalui doa yang jujur dan hati yang bersyukur.',
    prayer: 'Bapa Surgawi, kami serahkan segala kekhawatiran dan beban hidup kami ke dalam tangan-Mu. Berikanlah damai sejahtera-Mu yang melampaui segala akal untuk menjaga hati dan pikiran kami hari ini. Amin.',
    author: 'Tim Teologi & Ibadah GP',
    publish_date: '2026-09-23',
    status: 'published',
    cover_image: null
  },
  {
    slug: 'terang-yang-bercahaya-bagi-sesama-2026-09-22',
    title: 'Terang yang Bercahaya bagi Sesama',
    scripture_reference: 'Matius 5:16',
    scripture_text: 'Demikianlah hendaknya terangmu bercahaya di depan orang, supaya mereka melihat perbuatanmu yang baik dan memuliakan Bapamu yang di sorga.',
    reflection: 'Menjadi pemuda Kristen bukan soal tampil eksklusif atau merasa paling benar. Menjadi murid Kristus adalah tentang bagaimana kehadiran kita membawa kehangatan, integritas, dan pertolongan bagi orang-orang yang kita jumpai setiap hari di kampus, kantor, maupun lingkungan sekitar.',
    prayer: 'Tuhan, pakailah hidup kami hari ini menjadi alat kasih dan terang-Mu. Biarlah setiap kata dan tindakan kami memuliakan nama-Mu. Amin.',
    author: 'Tim Pelayanan GP Jatipon',
    publish_date: '2026-09-22',
    status: 'published',
    cover_image: null
  },
  {
    slug: 'menemukan-terang-dalam-kesibukan-2026-08-15',
    title: 'Menemukan Terang dalam Kesibukan',
    scripture_reference: 'Mazmur 119:105',
    scripture_text: 'Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.',
    reflection: 'Terkadang di tengah hiruk pikuk kehidupan kota, kita kehilangan arah dan kelelahan. Firman Tuhan hadir bukan untuk membebani, melainkan untuk menerangi setiap jengkal tapak kaki kita agar kita tidak tersandung.',
    prayer: 'Ya Tuhan, bimbinglah langkah kami dengan terang firman-Mu setiap saat. Amin.',
    author: 'Tim Pelayanan GP',
    publish_date: '2026-08-15',
    status: 'archived',
    cover_image: null
  },
  {
    slug: 'kekuatan-dalam-kelemahan-2026-09-25',
    title: 'Kekuatan dalam Kelemahan',
    scripture_reference: '2 Korintus 12:9',
    scripture_text: 'Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.',
    reflection: 'Renungan untuk besok.',
    prayer: 'Amin.',
    author: 'Tim Pelayanan GP',
    publish_date: '2026-09-25',
    status: 'scheduled',
    cover_image: null
  },
  {
    slug: 'rancangan-damai-sejahtera-2026-09-26',
    title: 'Rancangan Damai Sejahtera',
    scripture_reference: 'Yeremia 29:11',
    scripture_text: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu...',
    reflection: 'Draf renungan lusa.',
    prayer: 'Amin.',
    author: 'Tim Pelayanan GP',
    publish_date: '2026-09-26',
    status: 'draft',
    cover_image: null
  }
];

try {
  await client.connect();
  console.log('Connected to DB directly for seeding...');

  for (const b of sampleBoosts) {
    await client.query(`
      INSERT INTO public.boosts (
        slug, title, scripture_reference, scripture_text, reflection, prayer, author, publish_date, status, cover_image
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        scripture_reference = EXCLUDED.scripture_reference,
        scripture_text = EXCLUDED.scripture_text,
        reflection = EXCLUDED.reflection,
        prayer = EXCLUDED.prayer,
        author = EXCLUDED.author,
        publish_date = EXCLUDED.publish_date,
        status = EXCLUDED.status,
        cover_image = EXCLUDED.cover_image,
        updated_at = now();
    `, [
      b.slug, b.title, b.scripture_reference, b.scripture_text, b.reflection, b.prayer, b.author, b.publish_date, b.status, b.cover_image
    ]);
  }

  console.log(`Seeded ${sampleBoosts.length} boosts.`);
  await client.end();

  // Test reading via Supabase Client (anon key)
  console.log('\nTesting Supabase client with anon key...');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from('boosts')
    .select('id, slug, title, publish_date, status')
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('Supabase client error:', error);
  } else {
    console.log(`Supabase client successfully returned ${data.length} boosts visible to anon:`);
    console.table(data);
  }

} catch (err) {
  console.error('Seed error:', err);
  process.exit(1);
}
