import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ArrowUpRight,
  Terminal, Layout, Code2, Database,
  Cpu, GitBranch, Layers, Box
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────

const TECH_STACK = [
  { name: 'JavaScript',      category: 'Language',  icon: <Terminal   size={14} /> },
  { name: 'PHP',      category: 'Language',  icon: <Terminal   size={14} /> },
  { name: 'TypeScript',      category: 'Language',  icon: <Code2      size={14} /> },
  { name: 'Laravel',        category: 'Framework', icon: <Cpu        size={14} /> },
  { name: 'Express',        category: 'Framework', icon: <Cpu        size={14} /> },
  { name: 'React.js',        category: 'Framework', icon: <Cpu        size={14} /> },
  { name: 'Tailwind CSS',    category: 'Styling',   icon: <Layout     size={14} /> },
  { name: 'Vite',            category: 'Tooling',   icon: <Box        size={14} /> },
  { name: 'Node.js',         category: 'Backend',   icon: <Layers     size={14} /> },
  { name: 'MySQL',      category: 'Database',  icon: <Database   size={14} /> },
  { name: 'Git',             category: 'Tooling',   icon: <GitBranch  size={14} /> },
];

const JOURNEYS = [
  {
    year: '2025',
    role: 'Fullstack Developer Trainee',
    org: 'Coding Camp — DBS Foundation × Dicoding',
    tag: 'Scholarship',
    desc: 'Program beasiswa intensif end-to-end web development. Fokus pada arsitektur front-end responsif dan manajemen database back-end yang efisien.',
  },
  {
    year: '2024 — Present',
    role: 'Software Engineering Student',
    org: 'SMKN 1 Banyuwangi — Jurusan PPLG',
    tag: 'Education',
    desc: 'Mendalami fondasi pemrograman, struktur data, algoritma, dan pengembangan perangkat lunak di lingkungan akademis yang kompetitif.',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    category: 'Frontend',
    title: 'Memahami React Server Components di Era Modern',
    excerpt: 'Eksplorasi mendalam tentang bagaimana RSC mengubah cara kita membangun aplikasi React yang performatif dan scalable.',
  },
  {
    id: 2,
    category: 'Design',
    title: 'Prinsip Tipografi dalam Web Development',
    excerpt: 'Panduan praktis memilih font pairing yang tepat untuk membangun visual hierarchy yang kuat dan berkarakter.',
  },
  {
    id: 3,
    category: 'Career',
    title: 'Refleksi: Satu Tahun Belajar Coding Secara Mandiri',
    excerpt: 'Perjalanan jujur tentang kesalahan, pelajaran, dan hal-hal yang ingin aku ceritakan kepada diriku sendiri di masa lalu.',
  },
];

// ─── ANIMATION CONFIGS ────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

const stagger = (delay = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
});

// ─── SMALL UTILITIES ──────────────────────────────────────────

/** Animated section: triggers when it enters viewport */
const AnimSection = ({ children, className = '', id = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={stagger()}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/** Section header row with number + title + rule */
const SectionLabel = ({ index, label }) => (
  <motion.div variants={fadeIn} className="flex items-center gap-5 mb-16 md:mb-20">
    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--color-muted)]">
      {String(index).padStart(2, '0')} / {label}
    </span>
    <div className="section-rule" />
  </motion.div>
);

// ─── GRAIN OVERLAY ────────────────────────────────────────────

const GrainOverlay = () => <div className="grain-overlay" aria-hidden="true" />;

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-[var(--color-accent)]"
    />
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Stack', 'Journey', 'Writing', 'Contact'];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-canvas)]/90 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display font-black text-sm tracking-[0.35em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
        >
          ARKIZAN
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="link-underline text-[10px] font-semibold font-mono tracking-[0.25em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:contact@arkan.com"
          className="hidden md:flex items-center gap-2 text-[10px] font-semibold font-mono tracking-[0.2em] uppercase border border-[var(--color-ink)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-white transition-all duration-300"
        >
          Hire Me
          <ArrowUpRight size={11} />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-[var(--color-ink)] origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[1.5px] bg-[var(--color-ink)]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-[var(--color-ink)] origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="md:hidden overflow-hidden bg-[var(--color-canvas)] border-t border-[var(--color-border)]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-bold text-2xl tracking-tighter text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────

const Hero = () => (
  <section
    id="about"
    className="min-h-screen flex flex-col justify-end pb-16 md:pb-24 pt-28"
  >
    <div className="max-w-[1380px] mx-auto px-6 md:px-12 w-full">

      {/* Main grid: text + photo */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

        {/* ── Left: identity ── */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 border border-[var(--color-border)] rounded-full"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
              style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
            />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--color-muted)]">
              Open to Opportunities · 2025
            </span>
          </motion.div>

          {/* Name — staggered line reveal */}
          {['ARKAN', 'RIFQY', 'FAUZAN.'].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease }}
                className="block font-display font-black leading-[0.86] tracking-tighter"
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                  color: i === 2 ? 'var(--color-accent)' : 'var(--color-ink)',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-6 items-end"
          >
            <div>
              <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--color-muted)] mb-1.5">
                Role
              </p>
              <p className="font-display font-bold text-xl tracking-tight text-[var(--color-ink)]">
                Fullstack Web Developer
              </p>
              <p className="font-display font-bold text-xl tracking-tight text-[var(--color-ink)] opacity-50">
                & IoT Enthusiast
              </p>
            </div>

            <div className="max-w-[300px]">
              <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--color-muted)] mb-1.5">
                Based in
              </p>
              <p className="text-sm font-medium text-[var(--color-muted)] leading-relaxed">
                Banyuwangi, East Java, ID.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 lg:ml-auto">
              {[
                { href: 'https://github.com/Arkizan15', Icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/arkan-rifqy-fauzan-137a43223/',                            Icon: Linkedin, label: 'LinkedIn' },
                { href: 'raffibwi38@gmail.com',     Icon: Mail,    label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group w-10 h-10 border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] transition-all duration-300"
                >
                  <Icon
                    size={15}
                    className="text-[var(--color-muted)] group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative self-end shrink-0 w-56 h-72 md:w-68 md:h-88 lg:w-72 lg:h-96"
          style={{ width: '17rem', height: '22rem' }}
        >
          {/* Accent border behind photo */}
          <div
            className="absolute inset-0 border-2 border-[var(--color-accent)] clip-hero-photo"
            style={{ transform: 'translate(10px, 10px)', zIndex: 0 }}
          />
          {/* Photo container */}
          <div className="relative z-10 w-full h-full clip-hero-photo overflow-hidden bg-[var(--color-surface)]">
            <img
              src="/Profile.jpg"
              alt="Arkan Rifqy Fauzan"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              loading="eager"
            />
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-16 flex items-center gap-4"
      >
        <div className="flex flex-col gap-1">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-[var(--color-accent)] self-center"
          />
        </div>
        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[var(--color-muted)]">
          Scroll to explore
        </span>
      </motion.div>
    </div>
  </section>
);

// ─── STACK / SKILLS ───────────────────────────────────────────

const StackSection = () => (
  <AnimSection
    id="stack"
    className="py-24 md:py-36 max-w-[1380px] mx-auto px-6 md:px-12 w-full"
  >
    <SectionLabel index={2} label="Stack" />

    <motion.h2
      variants={fadeUp}
      className="font-display font-black tracking-tighter leading-[0.88] text-[var(--color-ink)] mb-16"
      style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
    >
      Tools &<br />Technologies.
    </motion.h2>

    {/* Grid: each cell is a tech tile */}
    <motion.div
      variants={stagger(0.05)}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-[var(--color-border)] divide-x divide-y divide-[var(--color-border)]"
    >
      {TECH_STACK.map((tech) => (
        <motion.div
          key={tech.name}
          variants={fadeUp}
          className="group relative bg-[var(--color-canvas)] p-6 hover:bg-[var(--color-ink)] transition-all duration-300 cursor-default overflow-hidden"
        >
          {/* Accent line on hover */}
          <div className="absolute left-0 top-0 w-0 h-[2px] bg-[var(--color-accent)] group-hover:w-full transition-all duration-500" />

          <div className="flex items-center gap-2 mb-3 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors">
            {tech.icon}
            <span className="text-[8px] font-mono tracking-[0.25em] uppercase">{tech.category}</span>
          </div>
          <p className="font-display font-bold text-sm text-[var(--color-ink)] group-hover:text-white transition-colors">
            {tech.name}
          </p>
        </motion.div>
      ))}
    </motion.div>

    {/* Marquee ribbon */}
    <motion.div
      variants={fadeIn}
      className="mt-14 overflow-hidden border-y border-[var(--color-border)] py-3"
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
          <span key={i} className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)]">
            {t.name}
            <span className="ml-10 text-[var(--color-accent)]">·</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  </AnimSection>
);

// ─── JOURNEY ─────────────────────────────────────────────────

const JourneySection = () => (
  <AnimSection
    id="journey"
    className="py-24 md:py-36 max-w-[1380px] mx-auto px-6 md:px-12 w-full"
  >
    <SectionLabel index={3} label="Journey" />

    <motion.h2
      variants={fadeUp}
      className="font-display font-black tracking-tighter leading-[0.88] text-[var(--color-ink)] mb-16"
      style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
    >
      Experience &<br />Education.
    </motion.h2>

    <div>
      {JOURNEYS.map((item, index) => (
        <motion.div
          key={index}
          variants={fadeUp}
          className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 md:gap-12 py-10 border-t border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors duration-300"
        >
          {/* Year + tag */}
          <div className="shrink-0 pt-1">
            <p className="font-mono text-xs text-[var(--color-muted)] mb-3">{item.year}</p>
            <span className="inline-block text-[8px] font-mono font-semibold tracking-[0.3em] uppercase px-2.5 py-0.5 border border-[var(--color-accent)] text-[var(--color-accent)]">
              {item.tag}
            </span>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {item.role}
            </h3>
            <p className="text-sm font-semibold text-[var(--color-muted)] mb-4">{item.org}</p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-lg">{item.desc}</p>
          </div>

          {/* Arrow */}
          <div className="flex items-start pt-1">
            <ArrowUpRight
              size={18}
              className="text-[var(--color-border)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </div>
        </motion.div>
      ))}
      <div className="border-t border-[var(--color-border)]" />
    </div>
  </AnimSection>
);

// ─── WRITING / BLOG ───────────────────────────────────────────

const WritingSection = () => (
  <AnimSection
    id="writing"
    className="py-24 md:py-36 max-w-[1380px] mx-auto px-6 md:px-12 w-full"
  >
    <SectionLabel index={4} label="Writing" />

    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
      <motion.h2
        variants={fadeUp}
        className="font-display font-black tracking-tighter leading-[0.88] text-[var(--color-ink)]"
        style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
      >
        Thoughts &<br />Writing.
      </motion.h2>
      <motion.p variants={fadeUp} className="text-sm text-[var(--color-muted)] max-w-xs leading-relaxed">
        Catatan dan artikel seputar frontend development, desain, dan perjalanan belajar — segera hadir.
      </motion.p>
    </div>

    <motion.div
      variants={stagger(0.12)}
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      {BLOG_POSTS.map((post) => (
        <motion.article
          key={post.id}
          variants={fadeUp}
          className="glass-card group relative p-8 cursor-pointer hover:border-[var(--color-ink)] transition-all duration-300"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors duration-400" />

          <div className="flex items-start justify-between mb-6">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase border border-[var(--color-accent)]/40 text-[var(--color-accent)] px-2.5 py-1">
              {post.category}
            </span>
            <span className="text-[9px] font-mono text-[var(--color-muted)]">Coming Soon</span>
          </div>

          <h3 className="font-display font-bold text-[1.05rem] text-[var(--color-ink)] leading-snug tracking-tight mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] uppercase text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors">
            Read more
            <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.article>
      ))}
    </motion.div>
  </AnimSection>
);

// ─── CONTACT ──────────────────────────────────────────────────

const ContactSection = () => (
  <AnimSection
    id="contact"
    className="py-24 md:py-36 max-w-[1380px] mx-auto px-6 md:px-12 w-full"
  >
    <SectionLabel index={5} label="Contact" />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Left */}
      <div>
        <motion.h2
          variants={fadeUp}
          className="font-display font-black tracking-tighter leading-[0.86] text-[var(--color-ink)] mb-10"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
        >
          Let's<br />
          <span style={{ color: 'var(--color-accent)' }}>Build</span>
          <br />Together.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-sm text-[var(--color-muted)] leading-relaxed max-w-sm">
          Terbuka untuk diskusi seputar proyek kolaborasi, magang, atau sekadar ngobrol tentang teknologi dan desain.
        </motion.p>
      </div>

      {/* Right: contact links */}
      <motion.div variants={stagger(0.1)} className="space-y-3 lg:pt-4">
        {[
          { label: 'Email',    value: 'contact@arkan.com',      href: 'mailto:contact@arkan.com' },
          { label: 'GitHub',   value: '@Arkizan15',              href: 'https://github.com/Arkizan15' },
          { label: 'LinkedIn', value: 'Arkan Rifqy Fauzan',      href: '#' },
        ].map(({ label, value, href }) => (
          <motion.a
            key={label}
            variants={fadeUp}
            href={href}
            className="group flex items-center justify-between p-6 border border-[var(--color-border)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] transition-all duration-300"
          >
            <div>
              <p className="text-[8px] font-mono tracking-[0.35em] uppercase text-[var(--color-muted)] group-hover:text-gray-500 mb-1.5 transition-colors">
                {label}
              </p>
              <p className="font-display font-bold text-lg tracking-tight text-[var(--color-ink)] group-hover:text-white transition-colors">
                {value}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="text-[var(--color-border)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </motion.a>
        ))}

        {/* Download CV */}
        <motion.a
          variants={fadeUp}
          href="#"
          className="group flex items-center justify-between p-6 bg-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
        >
          <div>
            <p className="text-[8px] font-mono tracking-[0.35em] uppercase text-gray-500 mb-1.5">Resume</p>
            <p className="font-display font-bold text-lg tracking-tight text-white">
              Download CV
            </p>
          </div>
          <ArrowUpRight size={18} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </motion.div>
    </div>
  </AnimSection>
);

// ─── FOOTER ───────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-[var(--color-border)] mt-8">
    <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
      <a
        href="#"
        className="font-display font-black text-xl tracking-[0.2em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
      >
        ARKIZAN
      </a>
      <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--color-muted)] text-center">
        © 2024 — 2025 · Arkan Rifqy Fauzan · Banyuwangi, ID
      </p>
      <div className="flex gap-8">
        {['GitHub', 'LinkedIn', 'Email'].map((item) => (
          <a
            key={item}
            href={item === 'GitHub' ? 'https://github.com/Arkizan15' : item === 'Email' ? 'mailto:contact@arkan.com' : '#'}
            className="link-underline text-[9px] font-mono tracking-[0.25em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── APP ROOT ─────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--color-canvas)', color: 'var(--color-ink)' }}
    >
      {/* Ambient layers */}
      <GrainOverlay />
      <ScrollProgress />

      {/* Subtle radial glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-20vh',
          left: '-10vw',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,93,4,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        {/* Horizontal rule between sections */}
        <div className="max-w-[1380px] mx-auto px-6 md:px-12">
          <div className="border-t border-[var(--color-border)]" />
        </div>

        <StackSection />

        <div className="max-w-[1380px] mx-auto px-6 md:px-12">
          <div className="border-t border-[var(--color-border)]" />
        </div>

        <JourneySection />

        <div className="max-w-[1380px] mx-auto px-6 md:px-12">
          <div className="border-t border-[var(--color-border)]" />
        </div>

        <WritingSection />

        <div className="max-w-[1380px] mx-auto px-6 md:px-12">
          <div className="border-t border-[var(--color-border)]" />
        </div>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}