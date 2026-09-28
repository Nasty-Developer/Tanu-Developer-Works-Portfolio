import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleArrowOutUpRight,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Palette,
  Phone,
  Send,
  Sparkles,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    number: '01',
    name: 'New National Advertising',
    category: 'Advertising / Printing / Signage',
    description: 'A premium digital presence for commercial signage, digital printing, and modern brand production.',
    visual: '/project-visuals/new-national-advertising.jpg',
    layout: 'feature-right',
    liveUrl: 'https://newnationaladvertising.com/',
  },
  {
    number: '02',
    name: 'Ayush Medico',
    category: 'Pharmacy / Medical',
    description: 'A trustworthy pharmacy experience that makes everyday healthcare feel clear, accessible, and easy to navigate.',
    visual: '/project-visuals/ayush-medico.jpg',
    layout: 'feature-left',
    liveUrl: 'https://ayushmedico.com/',
  },
  {
    number: '03',
    name: 'Dental Care Trust',
    category: 'Dental / Healthcare',
    description: 'An elegant healthcare experience built around calm guidance, professional care, and confidence at every step.',
    visual: '/project-visuals/dental-care-trust.jpg',
    layout: 'feature-wide',
    liveUrl: 'https://dentalcaretrust.com/',
  },
  {
    number: '04',
    name: 'SaveStreet Dogs',
    category: 'Animal Rescue / NGO',
    description: 'A compassionate adoption and rescue experience that helps more people find a meaningful way to help.',
    visual: '/project-visuals/save-street-dogs.jpg',
    layout: 'feature-reverse',
    liveUrl: 'https://savestreetdogss.com/',
  },
  {
    number: '05',
    name: 'Restaurant Website',
    category: 'Restaurant / Food / Hospitality',
    description: 'A premium hospitality experience shaped around atmosphere, appetite, and the anticipation of a good table.',
    visual: '/project-visuals/restaurant.jpg',
    layout: 'split',
    type: 'restaurant',
    liveUrl: 'https://serai-fa-premium.vercel.app/',
  },
  {
    number: '06',
    name: 'Somil Dental Clinic',
    category: 'Dental Clinic',
    description: 'A modern clinic presence that makes care, expertise, and the next appointment feel easy to understand.',
    visual: '/project-visuals/somil-dental-clinic.jpg',
    layout: 'reverse',
    liveUrl: 'https://somil-dental-clinic.vercel.app/',
  },
  {
    number: '07',
    name: 'Gaming Website',
    category: 'Gaming',
    description: 'A mature gaming experience built around discovery, performance, and the details that make a setup feel ready.',
    visual: '/project-visuals/gaming.jpg',
    layout: 'wide',
    liveUrl: 'https://tanugamehub.vercel.app/',
  },
  {
    number: '08',
    name: 'Gym Website',
    category: 'Gym / Fitness',
    description: 'An energetic fitness experience with the focus and confidence of a place built for showing up and getting stronger.',
    visual: '/project-visuals/gym.jpg',
    layout: 'reverse',
    liveUrl: 'https://aurum-gym.vercel.app/',
  },
  {
    number: '09',
    name: 'Clothing Website',
    category: 'Clothing / Fashion',
    description: 'An editorial fashion storefront where considered presentation gives everyday pieces room to speak.',
    visual: '/project-visuals/clothing.jpg',
    layout: 'split',
    liveUrl: 'https://sea-clothing.vercel.app/',
  },
  {
    number: '10',
    name: 'E-Commerce Website',
    category: 'E-Commerce',
    description: 'A clean retail experience that gives products, browsing, and the path to purchase equal attention.',
    visual: '/project-visuals/ecommerce.jpg',
    layout: 'wide',
    liveUrl: 'https://ecommerce-pro-tanu.vercel.app/',
  },
];

const capabilities = [
  { index: '01', title: 'Web experiences', text: 'Responsive marketing sites and portfolios with a point of view.', icon: Palette },
  { index: '02', title: 'Product interfaces', text: 'Thoughtful dashboards and tools that make complexity feel lighter.', icon: Code2 },
  { index: '03', title: 'Full-stack builds', text: 'The front end, API, database, and details that make it hold together.', icon: Zap },
];

const skills = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Firebase', 'Git', 'PostgreSQL', 'Node.js'];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-10 w-[72px] items-center rounded-full border border-[var(--line)] bg-background/75 px-1.5 backdrop-blur-md transition-colors hover:border-[var(--blue)]"
    >
      <span className={`absolute left-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-transform duration-300 ${dark ? 'translate-x-8' : ''}`}>
        {dark ? <Moon size={14} strokeWidth={1.8} /> : <Sun size={14} strokeWidth={1.8} />}
      </span>
      <span className="flex w-full justify-between px-1 text-muted-foreground">
        <Sun size={13} />
        <Moon size={13} />
      </span>
    </button>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Digital studio workspace showing websites and apps">
      <div className="hero-visual-glow hero-visual-glow-pink" />
      <div className="hero-visual-glow hero-visual-glow-blue" />
      <div className="hero-visual-frame">
        <img
          src="/hero-digital-studio.jpg"
          alt="A premium digital workspace with website and app interfaces"
        />
        <span className="hero-chip hero-chip-build">build</span>
        <span className="hero-chip hero-chip-design">design</span>
        <span className="hero-chip hero-chip-launch">launch</span>
      </div>
      <div className="hero-visual-footer">
        <span>web / apps / digital products</span>
        <span className="hero-visual-status"><i /> available for select work</span>
      </div>
    </div>
  );
}

function SignatureLoader({ exiting }: { exiting: boolean }) {
  return (
    <div className={`signature-loader ${exiting ? 'signature-loader-exit' : ''}`} aria-hidden={exiting}>
      <div className="signature-loader-glow signature-loader-glow-blue" />
      <div className="signature-loader-glow signature-loader-glow-pink" />
      <div className="signature-loader-content">
        <img src="/td-logo.png" alt="TD" className="signature-loader-logo" />
        <p className="signature-loader-name">Tanu Developer</p>
      </div>
    </div>
  );
}

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-5 pt-4 md:px-8">
      <div className="section-shell flex h-[64px] items-center justify-between rounded-full border border-[var(--line)] bg-background/82 px-4 shadow-[0_8px_35px_rgba(30,42,67,.06)] backdrop-blur-xl md:px-5">
        <button type="button" className="group flex items-center gap-2.5" onClick={() => go('#top')} aria-label="Back to top">
          <img src="/td-logo.png" alt="TD" className="td-logo td-logo-nav transition-transform group-hover:scale-[1.04]" />
          <span className="hidden text-sm font-semibold tracking-[-.02em] sm:block">Tanu Developer</span>
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => go(item.href)} className="underlined text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button type="button" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="section-shell mt-2 rounded-3xl border border-[var(--line)] bg-background/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => go(item.href)} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium hover:bg-secondary">
              {item.label}<ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function ProjectArtwork({ type }: { type: string }) {
  if (type === 'dashboard') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#dce8f5] p-5 text-[#17243b]">
        <div className="absolute right-[-8%] top-[-18%] h-64 w-64 rounded-full border-[20px] border-[#91b7e8]/60" />
        <div className="relative mt-9 ml-3 max-w-[340px] rounded-[14px] border border-[#b4cce5] bg-[#f7fafc]/90 p-4 shadow-xl shadow-[#6b89ad]/20">
          <div className="flex items-center justify-between"><div className="h-2.5 w-24 rounded-full bg-[#223858]" /><div className="flex gap-1"><i className="h-2 w-2 rounded-full bg-[#ed89aa]" /><i className="h-2 w-2 rounded-full bg-[#6ba2eb]" /></div></div>
          <div className="mt-7 grid grid-cols-3 gap-2"><div className="h-16 rounded-lg bg-[#e1ecf8]" /><div className="h-16 rounded-lg bg-[#e1ecf8]" /><div className="h-16 rounded-lg bg-[#e1ecf8]" /></div>
          <div className="mt-4 flex h-20 items-end gap-2 rounded-lg bg-[#edf3f9] p-3"><span className="h-8 w-1/6 rounded-t bg-[#91b7e8]" /><span className="h-12 w-1/6 rounded-t bg-[#ed89aa]" /><span className="h-6 w-1/6 rounded-t bg-[#91b7e8]" /><span className="h-14 w-1/6 rounded-t bg-[#223858]" /><span className="h-10 w-1/6 rounded-t bg-[#91b7e8]" /></div>
        </div>
        <span className="absolute bottom-5 right-5 font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#536b89]">operational clarity</span>
      </div>
    );
  }
  if (type === 'travel') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#1f4365]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,#f5b8c1_0,transparent_17%),linear-gradient(145deg,#9cc2d4_0%,#42738e_42%,#1f4365_100%)]" />
        <div className="absolute bottom-[-20%] left-[-5%] h-3/5 w-[120%] rotate-[-7deg] rounded-[50%] bg-[#17334e]/60" />
        <div className="absolute bottom-[-30%] right-[-10%] h-3/5 w-3/4 rotate-[13deg] rounded-[50%] bg-[#d88e9d]/55" />
        <div className="absolute left-[17%] top-[24%] h-32 w-32 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm" />
        <div className="absolute left-[22%] top-[31%] font-display text-3xl font-semibold tracking-[-.08em] text-white">go<br /><span className="pl-4">somewhere.</span></div>
        <span className="absolute bottom-5 left-5 font-mono-custom text-[10px] uppercase tracking-[.2em] text-white/70">routes / stays / stories</span>
      </div>
    );
  }
  if (type === 'restaurant') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#e8ded0] p-6 text-[#312a25]">
        <div className="absolute right-[-10%] top-[-25%] h-72 w-72 rounded-full border border-[#9b7a5d]/40" />
        <div className="relative flex h-full min-h-[250px] flex-col justify-between border-y border-[#8d735d]/45 py-4">
          <div className="flex items-start justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#8d735d]">the serai / dining</span><span className="font-display text-2xl font-semibold italic">S</span></div>
          <div><div className="font-display text-5xl font-semibold leading-[.86] tracking-[-.09em]">made<br /><span className="text-[#ad765d]">slowly.</span></div><div className="mt-5 h-px w-20 bg-[#8d735d]" /></div>
          <div className="flex items-end justify-between text-[10px] uppercase tracking-[.16em] text-[#8d735d]"><span>menu / reserve / order</span><span>07:00 — 23:00</span></div>
        </div>
      </div>
    );
  }
  if (type === 'dental') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#dceaf0] p-6 text-[#1d4152]">
        <div className="relative mx-auto flex min-h-[250px] max-w-[500px] flex-col justify-between border border-[#94b8c6] bg-[#edf6f6]/80 p-5">
          <div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#578193]">somil dental clinic</span><span className="flex h-6 w-6 items-center justify-center border border-[#74a5b5] text-[#4e879b]">+</span></div>
          <div><div className="font-display text-4xl font-semibold leading-[.9] tracking-[-.08em]">care,<br /><span className="text-[#5c94a5]">made clear.</span></div><p className="mt-4 max-w-[210px] text-xs leading-5 text-[#64808b]">Appointments, expertise, a calmer visit.</p></div>
          <div className="flex gap-2"><span className="h-1.5 w-14 rounded-full bg-[#5c94a5]" /><span className="h-1.5 w-6 rounded-full bg-[#b6d5dc]" /><span className="h-1.5 w-10 rounded-full bg-[#b6d5dc]" /></div>
        </div>
      </div>
    );
  }
  if (type === 'gaming') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#242b3c] p-6 text-[#e5e1db]">
        <div className="absolute inset-x-0 top-1/2 border-t border-[#e5e1db]/10" /><div className="absolute inset-y-0 left-1/2 border-l border-[#e5e1db]/10" />
        <div className="relative flex min-h-[250px] flex-col justify-between">
          <div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#e8a0ae]">game / check</span><span className="font-mono-custom text-[10px] text-[#8792a8]">fps 144</span></div>
          <div><div className="font-display text-5xl font-semibold leading-[.85] tracking-[-.09em]">will it<br /><span className="text-[#e8a0ae]">run?</span></div><div className="mt-6 flex gap-1"><i className="h-8 w-1 bg-[#8da9d5]" /><i className="h-12 w-1 bg-[#e8a0ae]" /><i className="h-16 w-1 bg-[#8da9d5]" /><i className="h-10 w-1 bg-[#e8a0ae]" /><i className="h-20 w-1 bg-[#8da9d5]" /></div></div>
          <div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#8792a8]"><span>hardware analysis</span><span>01 / 04</span></div>
        </div>
      </div>
    );
  }
  if (type === 'gym') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#172c43] p-6 text-[#f3eee7]">
        <div className="absolute bottom-0 right-[16%] h-[78%] w-20 skew-x-[-16deg] bg-[#d8839e]/80" /><div className="absolute bottom-0 right-[2%] h-[58%] w-10 skew-x-[-16deg] bg-[#87a8db]/65" />
        <div className="relative flex min-h-[250px] flex-col justify-between">
          <div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#a5bbd8]">aurum / training</span><span className="font-display text-xl font-bold italic">A.</span></div>
          <div><div className="font-display text-5xl font-extrabold uppercase leading-[.78] tracking-[-.09em]">move<br /><span className="text-[#d8839e]">with intent.</span></div><div className="mt-6 flex gap-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#a5bbd8]"><span>classes</span><span>plans</span><span>trainers</span></div></div>
          <span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#a5bbd8]">strength / rhythm / repeat</span>
        </div>
      </div>
    );
  }
  if (type === 'clothing') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#eededc] p-6 text-[#382c35]">
        <div className="absolute bottom-0 right-[12%] h-[85%] w-1/2 bg-[#d1a5ae]/55" />
        <div className="relative flex min-h-[250px] flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#8f6977]/35 pb-3"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#8f6977]">sea / collection 01</span><span className="font-mono-custom text-[10px] text-[#8f6977]">shop</span></div>
          <div><div className="font-display text-5xl font-semibold leading-[.83] tracking-[-.1em]">soft<br />structure.</div><p className="mt-5 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#8f6977]">objects for an everyday wardrobe</p></div>
          <div className="flex justify-between border-t border-[#8f6977]/35 pt-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#8f6977]"><span>new arrivals</span><span>02 / 06</span></div>
        </div>
      </div>
    );
  }
  if (type === 'ecommerce') {
    return (
      <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#e1eaf1] p-6 text-[#203349]">
        <div className="relative flex min-h-[250px] flex-col justify-between">
          <div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#55708f]">shop / one place</span><span className="h-5 w-5 border border-[#55708f] text-center text-[10px] leading-5">2</span></div>
          <div className="flex items-end justify-between gap-6"><div><div className="font-display text-5xl font-semibold leading-[.84] tracking-[-.09em]">find<br /><span className="text-[#5b84b3]">your next.</span></div><div className="mt-6 h-1 w-20 bg-[#d9829c]" /></div><div className="w-28 border-l border-[#9bb4cc] pl-4 font-mono-custom text-[10px] uppercase leading-5 tracking-[.12em] text-[#55708f]">catalog<br />cart<br />delivery</div></div>
          <div className="flex justify-between border-t border-[#9bb4cc] pt-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#55708f]"><span>admin / orders / track</span><span>ready to ship</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className="project-art relative h-full min-h-[300px] overflow-hidden bg-[#f5d9df]">
      <div className="absolute right-[-8%] top-[-30%] h-[330px] w-[330px] rounded-full border-[38px] border-[#ee86a4]/55" />
      <div className="absolute bottom-[-25%] left-[-12%] h-[280px] w-[280px] rounded-full bg-[#9dbfe8]/75" />
      <div className="absolute left-[12%] top-[21%] w-[72%] rotate-[-4deg] rounded-[16px] border border-[#b98b9b] bg-[#fffaf7]/90 p-4 shadow-2xl shadow-[#a97888]/25">
        <div className="flex items-center justify-between"><span className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#6e6870]">ayush / care</span><CircleArrowOutUpRight size={15} className="text-[#45658b]" /></div>
        <div className="mt-8 font-display text-4xl font-semibold tracking-[-.08em] text-[#17243b]">good care<br /><span className="text-[#d87597]">starts here.</span></div>
        <div className="mt-8 h-1 w-20 bg-[#17243b]" />
      </div>
      <span className="absolute bottom-5 right-5 font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#685463]">everyday wellness</span>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <article className={`project-story project-story-${project.layout} group`}>
      <div className="project-story-visual overflow-hidden">
        <img
          src={project.visual}
          alt={`${project.name} — ${project.category}`}
          className="project-image"
          loading={Number(project.number) > 2 ? 'lazy' : 'eager'}
        />
      </div>
      <div className="project-story-copy">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <span className="font-mono-custom text-[11px] text-muted-foreground">{project.number} / {project.category}</span>
          <ArrowUpRight size={17} className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>
        <h3 className="mt-7 font-display text-4xl font-bold tracking-[-.07em] md:text-5xl">{project.name}</h3>
        <p className="mt-4 max-w-[390px] text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <button type="button" onClick={() => scrollToId('#contact')} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-foreground">Discuss this build <MoveUpRight size={14} className="button-arrow" /></button>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="visit-website flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-[.1em] text-background transition-transform hover:-translate-y-0.5">
            Visit Website <ExternalLink size={13} className="button-arrow" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const [dark, setDark] = useState(false);
  const [sent, setSent] = useState(false);
  const [menuToast, setMenuToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaderExiting, setLoaderExiting] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('tanu-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(stored ? stored === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('tanu-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    let cancelled = false;
    let exitTimer: number | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const preload = (src: string) => new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = src;
    });
    const pageReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

    Promise.all([
      pageReady,
      preload('/td-logo.png'),
      preload('/hero-digital-studio.jpg'),
      preload('/tanu-portrait.png'),
    ]).then(() => {
      if (cancelled) return;
      if (reducedMotion) {
        setLoading(false);
        return;
      }
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        setLoaderExiting(true);
        exitTimer = window.setTimeout(() => setLoading(false), 620);
      });
    });

    return () => {
      cancelled = true;
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get('name') || '');
    const email = String(values.get('email') || '');
    const message = String(values.get('message') || '');
    setSent(true);
    setMenuToast(true);
    window.setTimeout(() => setMenuToast(false), 4200);
    window.location.href = `mailto:tanudevworks@gmail.com?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;
  };

  return (
    <>
      <div id="top" className="site-shell min-h-[100dvh]">
      <Header dark={dark} onToggle={() => setDark(!dark)} />
      <main>
        <section className="relative min-h-[780px] overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pt-44">
          <div className="pointer-events-none absolute left-[56%] top-32 h-[440px] w-[440px] rounded-full bg-[var(--pink)]/10 blur-3xl" />
          <div className="pointer-events-none absolute right-[-80px] top-56 h-[380px] w-[380px] rounded-full bg-[var(--blue)]/10 blur-3xl" />
          <div className="section-shell relative hero-shell">
            <div className="mb-16 flex items-center justify-between border-b border-[var(--line)] pb-4 reveal">
              <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-muted-foreground">Mumbai, India <span className="mx-2 text-[var(--pink)]">/</span> available for select work</p>
              <span className="hidden items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.2em] text-muted-foreground sm:flex"><i className="h-1.5 w-1.5 rounded-full bg-[#55b981]" /> 2025 — now</span>
            </div>
            <div className="hero-grid">
              <div className="max-w-[920px]">
                <p className="mb-5 flex items-center gap-2 font-mono-custom text-xs uppercase tracking-[.19em] text-[var(--blue)] reveal reveal-delay-1"><Sparkles size={14} /> Web Developer &amp; Digital Creator</p>
                <h1 className="font-display text-[clamp(3.5rem,9.5vw,8.8rem)] font-extrabold leading-[.91] tracking-[-.095em] reveal reveal-delay-1">Interfaces<br /><span className="text-[var(--blue)]">with intent.</span></h1>
                <div className="mt-10 flex max-w-[650px] flex-col justify-between gap-8 sm:flex-row sm:items-end reveal reveal-delay-2">
                  <p className="max-w-[390px] text-[17px] leading-7 text-muted-foreground">I’m Tanu Tapase — a full-stack developer building digital experiences that feel clear, capable, and worth remembering.</p>
                  <button type="button" onClick={() => scrollToId('#work')} className="group flex w-fit items-center gap-3 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
                    Explore selected work <ArrowDownRight size={17} className="button-arrow" />
                  </button>
                </div>
              </div>
              <HeroVisual />
            </div>
            <div className="relative mt-20 flex items-end justify-between border-t border-[var(--line)] pt-6 reveal reveal-delay-3">
              <div className="flex gap-10">
                <div><p className="font-display text-3xl font-bold tracking-[-.06em]">01</p><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">developer access</p></div>
                <div><p className="font-display text-3xl font-bold tracking-[-.06em]">∞</p><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">curiosity</p></div>
              </div>
              <div className="hidden h-20 w-20 items-center justify-center rounded-full border border-[var(--line)] sm:flex"><div className="orbit absolute h-20 w-20 rounded-full border-t border-[var(--blue)]" /><ArrowDownRight size={20} /></div>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--blue)]">Selected work</span><h2 className="mt-5 font-display text-5xl font-bold tracking-[-.08em] md:text-7xl">Made to be used.</h2></div><p className="max-w-[250px] text-sm leading-6 text-muted-foreground">A few digital products and experiences shaped with care.</p></div>
            <div>{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 border-y border-[var(--line)] bg-secondary/45 px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell about-shell">
            <div className="about-intro">
              <p className="about-phrase">⌁ Same girl.<br />Bigger dreams.</p>
              <span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--pink)]">About Me</span>
            </div>
            <div className="about-layout">
              <div className="about-photo-wrap">
                <div className="about-photo-glow" />
                <img src="/tanu-portrait.png" alt="Tanu smiling in a warm indoor portrait" className="about-photo" />
                <span className="about-photo-label">tanu / digital creator</span>
              </div>
              <div className="about-copy">
                <h2 className="font-display text-5xl font-bold leading-[.94] tracking-[-.08em] md:text-7xl">Hi, I'm Tanu</h2>
                <p className="mt-7 max-w-[520px] text-lg leading-8 text-muted-foreground">I'm a computer science student and a passionate full-stack web developer. I enjoy building clean, efficient and user-friendly websites. I love learning new technologies and turning ideas into real-world products.</p>
                <div className="about-details mt-10">
                  <div><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">Computer Science</span><strong>Student</strong></div>
                  <div><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">Mumbai, India</span><strong>Based here</strong></div>
                  <div><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">Tech · Games · Animals</span><strong>(yes, all of it)</strong></div>
                </div>
              </div>
            </div>
            <blockquote className="about-quote">"I don't just want to build websites.<br /><span>I want to build things that matter."</span></blockquote>
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
            <div>
              <span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--blue)]">My Skills</span>
              <h2 className="mt-6 font-display text-5xl font-bold leading-[.96] tracking-[-.08em] md:text-7xl">Built for<br /><span className="text-[var(--pink)]">the details.</span></h2>
              <p className="mt-7 max-w-[390px] text-lg leading-8 text-muted-foreground">Technologies I Work With</p>
              <a href="https://tanu-labs.vercel.app/#contact" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">View All Skills <ExternalLink size={15} className="button-arrow" /></a>
            </div>
            <div>
              <p className="max-w-[470px] text-lg leading-8 text-muted-foreground">A flexible stack for fast feedback, durable systems, and interfaces that stay lovely when the screen gets smaller.</p>
              <div className="skill-index mt-12 max-w-[620px] border-t border-[var(--line)]">{skills.map((skill, index) => <div key={skill} className="flex items-baseline justify-between border-b border-[var(--line)] py-4 transition-colors hover:border-[var(--blue)]"><span className="font-mono-custom text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span><span className="font-display text-2xl font-semibold tracking-[-.05em] md:text-3xl">{skill}</span><span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">{index < 4 ? 'interface' : index < 6 ? 'systems' : 'tooling'}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-foreground px-5 py-24 text-background md:px-8 md:py-32">
          <div className="section-shell">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--pink)]">What I bring</span><h2 className="mt-5 max-w-[600px] font-display text-4xl font-bold leading-[.96] tracking-[-.07em] md:text-6xl">Good work starts<br />before the code.</h2></div><p className="max-w-[270px] text-sm leading-6 text-background/60">Business-focused design, direct communication, and a build process that respects your time.</p></div>
            <div className="mt-16 border-t border-background/20">{capabilities.map(({ index, title, text, icon: Icon }) => <div key={title} className="capability-line group flex flex-col gap-4 border-b border-background/20 py-7 md:flex-row md:items-center md:gap-12"><span className="w-10 font-mono-custom text-[10px] text-background/45">{index}</span><Icon size={19} strokeWidth={1.5} className="hidden text-[var(--pink)] transition-transform group-hover:rotate-6 md:block" /><h3 className="min-w-[230px] font-display text-2xl font-semibold tracking-[-.05em]">{title}</h3><p className="max-w-[380px] text-sm leading-6 text-background/60">{text}</p><ArrowUpRight size={17} className="ml-auto hidden text-background/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" /></div>)}</div>
          </div>
        </section>

        <section id="process" className="scroll-mt-28 border-y border-[var(--line)] px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell grid gap-14 md:grid-cols-[.72fr_1.28fr]">
            <div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--pink)]">The process</span><h2 className="mt-6 max-w-[330px] font-display text-5xl font-bold leading-[.96] tracking-[-.08em] md:text-6xl">Clear steps.<br />No theatre.</h2><p className="mt-7 max-w-[300px] text-sm leading-6 text-muted-foreground">You’ll always know what we’re solving, what happens next, and where your project stands.</p></div>
            <div className="border-t border-[var(--line)]">{[['01', 'Align', 'We get specific about the business, the audience, and what success needs to feel like.'], ['02', 'Shape', 'I translate the brief into a sharp direction — structure, language, visual system, and plan.'], ['03', 'Build', 'The experience comes to life in clean, responsive code with regular, useful check-ins.'], ['04', 'Refine', 'We test the edges, tune the details, and hand over something ready for the real world.']].map(([num, title, text]) => <div key={num} className="grid grid-cols-[46px_1fr] gap-5 border-b border-[var(--line)] py-7 md:grid-cols-[68px_150px_1fr] md:gap-7"><span className="font-mono-custom text-xs text-[var(--blue)]">{num}</span><h3 className="font-display text-xl font-semibold tracking-[-.04em]">{title}</h3><p className="col-start-2 text-sm leading-6 text-muted-foreground md:col-start-auto">{text}</p></div>)}</div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-secondary/35 px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell grid gap-14 md:grid-cols-[.8fr_1.2fr]">
            <div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--pink)]">A short timeline</span><h2 className="mt-6 font-display text-5xl font-bold leading-[.96] tracking-[-.08em] md:text-6xl">In the<br />making.</h2></div>
            <div className="relative border-l border-[var(--line)] pl-7 md:pl-12">{[['2021', 'First commercial project', 'The first real brief, the first launch, and the start of taking web work seriously.'], ['2022', 'Studio founded', 'Tanu Developer takes shape as a home for thoughtful design and full-stack development.'], ['2025', 'Premium studio launch', 'A sharper point of view: better systems, better stories, and a more considered way to build.']].map(([year, title, text], index) => <div key={year} className="relative pb-12 last:pb-0"><i className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background ${index === 2 ? 'bg-[var(--pink)]' : 'bg-[var(--blue)]'} md:-left-[55px]`} /><span className="font-mono-custom text-xs text-[var(--blue)]">{year}</span><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.05em]">{title}</h3><p className="mt-3 max-w-[420px] text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 px-5 py-24 md:px-8 md:py-32">
          <div className="section-shell grid gap-14 md:grid-cols-[.92fr_1.08fr] md:gap-24">
            <div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[var(--blue)]">Let’s make something useful</span><h2 className="mt-6 font-display text-5xl font-bold leading-[.93] tracking-[-.09em] md:text-[5.5rem]">Have a good<br /><span className="text-[var(--pink)]">one in mind?</span></h2><p className="mt-8 max-w-[390px] text-base leading-7 text-muted-foreground">Tell me what you’re building, where it’s stuck, or what you want it to become. I’ll reply at <strong className="text-foreground">tanudevworks@gmail.com</strong>.</p><div className="mt-10 flex flex-wrap gap-3"><a href="https://wa.me/918433553501" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-xs font-semibold transition-colors hover:border-[var(--blue)]"><Phone size={14} /> WhatsApp</a><a href="mailto:tanudevworks@gmail.com" className="flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-xs font-semibold transition-colors hover:border-[var(--blue)]"><Mail size={14} /> Email directly</a></div></div>
            <form onSubmit={submitContact} className="contact-form border-t border-[var(--line)] pt-7 md:pt-8">
              <div className="mb-8 flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-muted-foreground">Project enquiry</span><BriefcaseBusiness size={18} className="text-[var(--pink)]" /></div>
              <div className="grid gap-6 sm:grid-cols-2"><label className="text-xs font-medium">Your name<input required name="name" placeholder="What should I call you?" className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground" /></label><label className="text-xs font-medium">Your email<input required type="email" name="email" placeholder="you@company.com" className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground" /></label></div>
              <label className="mt-7 block text-xs font-medium">What are we making?<textarea required name="message" rows={4} placeholder="A sentence or two is perfect." className="mt-2 w-full resize-none border-b border-[var(--line)] bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground" /></label>
              <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><span className="text-xs text-muted-foreground">{sent ? 'Thanks — your note is ready to send.' : 'Usually replies within 1–2 working days.'}</span><button type="submit" className="group flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-xs font-semibold text-background transition-transform hover:-translate-y-0.5">{sent ? <Check size={15} /> : <Send size={15} />} {sent ? 'Message noted' : 'Send enquiry'} {!sent && <ArrowUpRight size={14} className="button-arrow" />}</button></div>
            </form>
          </div>
        </section>
      </main>
      <footer className="border-t border-[var(--line)] px-5 py-10 md:px-8">
        <div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="flex items-center gap-2.5"><img src="/td-logo.png" alt="TD" className="td-logo td-logo-footer" /><span className="text-sm font-semibold tracking-[-.02em]">Tanu Developer</span></div><p className="mt-4 max-w-[270px] text-xs leading-5 text-muted-foreground">Independent full-stack developer and digital creator in Mumbai, India.</p></div><div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground"><a className="underlined" href="https://www.instagram.com/tanuuuyyyy?igsh=cDAya3h0YnpxcmFq" target="_blank" rel="noreferrer"><Instagram size={15} /></a><a className="underlined" href="https://github.com/tanudevworks-web" target="_blank" rel="noreferrer"><Github size={15} /></a><a className="underlined" href="https://www.linkedin.com/in/tanu-tapase-461405411" target="_blank" rel="noreferrer"><Linkedin size={15} /></a><span className="ml-2 border-l border-[var(--line)] pl-5">© 2025 Tanu Tapase</span><button type="button" onClick={() => scrollToId('#top')} className="flex items-center gap-1 font-medium text-foreground">Back to top <ChevronDown size={14} className="rotate-180" /></button></div></div>
      </footer>
      {menuToast && <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--line)] bg-foreground px-4 py-3 text-xs font-medium text-background shadow-[var(--shadow-float)]"><Check size={14} className="text-[var(--pink)]" /> Your enquiry is ready — email Tanu directly to send it.</div>}
      </div>
      {loading && <SignatureLoader exiting={loaderExiting} />}
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;