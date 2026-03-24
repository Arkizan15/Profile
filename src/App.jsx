import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Terminal,
  Globe,
  Layout,
  ArrowUpRight,
  Database,
  Cpu
} from 'lucide-react';

/**
 * Data Statistik Kemampuan Teknis (Berdasarkan estimasi penggunaan GitHub)
 * Kamu bisa menyesuaikan persentase ini sesuai dengan statistik asli di GitHub kamu.
 */
const TECH_STATS = [
  { name: 'JavaScript & TypeScript', percent: 88, icon: <Terminal size={18} />, color: 'bg-yellow-400' },
  { name: 'React.js & Vite', percent: 82, icon: <Cpu size={18} />, color: 'bg-blue-500' },
  { name: 'HTML & CSS (Tailwind)', percent: 95, icon: <Layout size={18} />, color: 'bg-cyan-400' },
  { name: 'Node.js & Express', percent: 65, icon: <Code2 size={18} />, color: 'bg-green-500' },
  { name: 'PostgreSQL & SQL', percent: 60, icon: <Database size={18} />, color: 'bg-indigo-500' },
  { name: 'Git & Workflow', percent: 92, icon: <Github size={18} />, color: 'bg-slate-800' },
];

/**
 * Data Perjalanan (My Journey)
 */
const JOURNEYS = [
  {
    year: '2025',
    role: 'Fullstack Developer Trainee',
    organization: 'Coding Camp by DBS Foundation x Dicoding',
    desc: 'Program beasiswa intensif yang berfokus pada pengembangan aplikasi web end-to-end, mulai dari arsitektur front-end yang responsif hingga manajemen database back-end yang efisien.'
  },
  {
    year: '2024 — Sekarang',
    role: 'Siswa PPLG (Pengembangan Perangkat Lunak & Gim)',
    organization: 'SMKN 1 Banyuwangi',
    desc: 'Mendalami fondasi pemrograman, struktur data, dan pengembangan perangkat lunak dalam lingkungan akademis yang kompetitif di Banyuwangi.'
  }
];

const PROJECTS = [
  {
    title: 'Arkizan Portfolio V1',
    tech: ['React', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com/Arkizan15',
    desc: 'Website portofolio interaktif dengan animasi smooth dan desain berbasis grid modern.'
  },
  {
    title: 'System Management Tool',
    tech: ['Node.js', 'PostgreSQL'],
    github: 'https://github.com/Arkizan15',
    desc: 'Solusi manajemen data terintegrasi untuk optimasi pencatatan informasi tim.'
  }
];

// --- Sub-Komponen ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-blue-700 font-black text-xl tracking-tighter"
      >
        ARKAN.
      </motion.span>
      <div className="hidden md:flex gap-10 text-[11px] font-black text-slate-500 tracking-[0.2em] uppercase">
        {['About', 'Skills', 'Journey', 'Projects'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
            {item}
          </a>
        ))}
      </div>
      <a
        href="mailto:contact@arkan.com"
        className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-blue-600 transition-all shadow-lg"
      >
        HUBUNGI SAYA
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section id="about" className="min-h-screen pt-20 flex flex-col items-center justify-center relative px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl relative z-10"
    >
      <div className="relative mb-8 inline-block">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-slate-50 flex items-center justify-center"
        >
          {/* Masukkan URL foto aslimu di sini */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arkan"
            alt="Arkan Rifqy Fauzan"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
          <Code2 size={18} />
        </div>
      </div>

      <h2 className="text-blue-600 font-mono text-xs font-bold tracking-[0.4em] uppercase mb-4">Software Engineering Student</h2>
      <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter">
        ARKAN RIFQY <br /> FAUZAN.
      </h1>
      <p className="text-slate-500 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-medium mx-auto">
        Pelajar PPLG yang bersemangat membangun aplikasi web modern. Berfokus pada kebersihan kode dan pengalaman pengguna yang intuitif.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        <a href="#projects" className="group flex items-center gap-2 font-black text-slate-900 hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">
          Portfolio <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
        <a href="https://github.com/Arkizan15" className="flex items-center gap-2 font-black text-slate-900 hover:text-blue-600 transition-colors uppercase text-sm tracking-widest">
          GitHub <Github size={18} />
        </a>
      </div>
    </motion.div>
  </section>
);

const SkillSection = () => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="mb-16">
        <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">Teknologi</span>
        <h2 className="text-4xl font-black text-slate-900 mt-2 tracking-tight uppercase">Tools & Languages.</h2>
        <div className="w-16 h-1 bg-blue-600 mt-4"></div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {TECH_STATS.map((tech, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-blue-600 group-hover:scale-110 transition-transform">{tech.icon}</span>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-sm">{tech.name}</span>
              </div>
              <span className="font-mono font-bold text-slate-400 text-sm">{tech.percent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tech.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className={`${tech.color} h-full rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const JourneySection = () => (
  <section id="journey" className="py-32 px-6 bg-slate-50 relative border-y border-slate-100">
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">My Journey.</h2>
        <p className="text-slate-500 font-medium mt-2 uppercase tracking-[0.1em] text-sm">Pendidikan & Pencapaian</p>
      </div>

      <div className="space-y-6">
        {JOURNEYS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="md:w-1/3 shrink-0">
              <span className="inline-block px-4 py-1 bg-blue-600 text-white font-mono font-bold text-[10px] rounded-full mb-4 tracking-widest uppercase">
                {item.year}
              </span>
              <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                {item.role}
              </h3>
            </div>
            <div className="md:w-2/3">
              <h4 className="text-lg font-bold text-blue-600 mb-4 tracking-tight">{item.organization}</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectSection = () => (
  <section id="projects" className="py-32 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Featured Projects.</h2>
        <a href="https://github.com/Arkizan15" className="text-blue-600 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors uppercase text-xs tracking-[0.2em]">
          All Repositories <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="aspect-video bg-slate-50 rounded-[2rem] mb-8 overflow-hidden flex items-center justify-center border border-slate-200">
              <Globe size={60} className="text-slate-300 group-hover:text-blue-600 transition-colors" strokeWidth={1} />
            </div>
            <div className="px-2">
              <div className="flex gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="text-[9px] font-black uppercase tracking-widest text-blue-600 border border-blue-600/30 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 bg-white border-t border-slate-100">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
      <div>
        <div className="text-slate-900 font-black text-2xl tracking-tighter mb-2">ARKAN.</div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2024 — 2025 BY ARKAN RIFQY FAUZAN
        </p>
      </div>
      <div className="flex gap-8">
        <a href="https://github.com/Arkizan15" className="text-slate-900 hover:text-blue-600 transition-colors"><Github size={20} /></a>
        <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
        <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Mail size={20} /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-white w-full h-full text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased relative min-h-screen overflow-x-hidden m-0 p-0">
      {/* Progress Scroll Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left" style={{ scaleX }} />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SkillSection />
        <JourneySection />
        <ProjectSection />

        {/* Contact CTA */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-none">
            Ready to build <br /> something great?
          </h2>
          <a
            href="mailto:contact@arkan.com"
            className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl shadow-blue-100 tracking-widest uppercase"
          >
            Get In Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}