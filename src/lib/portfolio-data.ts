// Everything the site says lives here. Sections read from these exports.

export const CAREER_START = new Date(2019, 8, 1); // first dev job, Sep 2019

const DAY = 864e5;
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.floor((now.getTime() - CAREER_START.getTime()) / (365.25 * DAY));
}
export function daysSinceStart(now: Date = new Date()): number {
  return Math.floor((now.getTime() - CAREER_START.getTime()) / DAY);
}

export const person = {
  name: 'Coleman Rose',
  role: 'Senior Software Engineer',
  location: 'Helsinki, Finland',
};

export const contact = {
  email: 'info@colemanro.se',
  github: 'https://github.com/colemanswe',
  linkedin: 'https://linkedin.com/in/coleman-rose',
};

export interface Job {
  dates: string;
  company: string;
  location: string;
  role: string;
  bullets: string[];
  tech: string[];
}

export const jobs: Job[] = [
  {
    dates: 'Aug 2025 – now',
    company: '255 PIX Studio',
    location: 'Helsinki',
    role: 'Engineering Lead',
    bullets: [
      "Build plugins and scripts for the VFX team's tools, including Nuke and DaVinci Resolve.",
      'Develop an automation system that combines production tracking with render-farm-style job scheduling.',
      'Set up 3D pre-production and AI image and video workflows in ComfyUI.',
      'Own engineering across a studio that moves between experiments quickly: prototype, test the idea, and ship or cut it fast.',
      'Led engineering on Everscene, a desktop app wiring Unreal Engine, ComfyUI and other AI animation tools into one workflow, and After Endings, an AI-driven narrative RPG. Both were prototyped end to end, then cut by the studio.',
    ],
    tech: ['Python', 'Nuke', 'DaVinci Resolve', 'ComfyUI', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Supabase', 'Postgres', 'Unreal Engine'],
  },
  {
    dates: 'Feb – Aug 2025',
    company: 'Limber AS',
    location: 'Helsinki',
    role: 'Senior Frontend Engineer',
    bullets: [
      'Led new feature work and kept the core platform healthy.',
      'Built DOM-heavy features with TypeScript, Lit and modern browser APIs.',
    ],
    tech: ['TypeScript', 'Lit', 'Browser APIs'],
  },
  {
    dates: 'Jul 2023 – Feb 2025',
    company: 'FireTail.io',
    location: 'Helsinki',
    role: 'Frontend Developer',
    bullets: [
      'Built and maintained UI in React, TypeScript, Tailwind and Ant Design.',
      'Ran CI/CD on GitHub Actions and AWS.',
      'Tested with Jest, Cypress and React Testing Library, and pitched in on the Python backend.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'AWS', 'Jest', 'Cypress', 'Python'],
  },
  {
    dates: 'Jan – Jul 2023',
    company: 'Sayduck',
    location: 'Helsinki',
    role: 'Senior Fullstack Developer',
    bullets: [
      'Worked on 3D e-commerce software, mostly on the backend.',
      'Built a 3D model viewer and UI in React, TypeScript and Three.js.',
    ],
    tech: ['Ruby on Rails', 'React', 'Three.js'],
  },
  {
    dates: 'Jan – Nov 2022',
    company: 'izz.ai',
    location: 'Munich',
    role: 'Software Developer',
    bullets: ['Built front-end features for the Engel & Völkers real estate platform.'],
    tech: ['React', 'TypeScript', 'Next.js', 'Material UI'],
  },
  {
    dates: 'Feb 2021 – Jan 2022',
    company: 'Coronation',
    location: 'Stockholm',
    role: 'Software Developer',
    bullets: [
      'Built React components for iamai.se and turned wireframes into UI.',
      'Reworked routing and the front-end architecture.',
    ],
    tech: ['React', 'Redux', 'jQuery', 'Bootstrap'],
  },
  {
    dates: 'Sep 2019 – Jan 2021',
    company: 'Beamon People (ALTEN)',
    location: 'Stockholm',
    role: 'Software Developer',
    bullets: ['Full-stack work from picking the stack through launch and maintenance.'],
    tech: ['React', 'TypeScript', 'NestJS', 'Python', 'Contentful'],
  },
];

export const game = {
  title: 'Absolution Engine',
  kicker: 'Now making · solo project',
  genre: 'First-person claims-desk horror · Godot 4',
  pitch:
    "You work the claims desk for an insurer that sells absolution. Weigh each client's sins against the plan they bought, then seal the verdict: a luxury sim, or a life spent carrying someone else's guilt. The rulebook grows every shift.",
  stats: [
    { value: '94', label: 'custom shaders' },
    { value: '4', label: 'luxury sims' },
    { value: '1', label: 'developer' },
  ],
  tech: 'Godot 4 · GDScript · GLSL · Blender',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/absolutionengine/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@absolutionengine' },
    { label: 'YouTube', href: 'https://www.youtube.com/@AbsolutionEngine' },
  ],
  images: [
    {
      src: '/textures/absolution-loud-square.jpg',
      alt: "Absolution Engine: the Plaza's loud look, a checkerboard square with chrome towers, a fountain and floating glass bubbles",
    },
    {
      src: '/textures/absolution-loud-aerial.jpg',
      alt: 'Absolution Engine: aerial view of the loud Plaza on its island, reflected in flat blue water',
    },
  ],
};

export const erosionStudio = {
  num: '001',
  title: 'Erosion Studio',
  meta: 'Desktop app · open source',
  body: 'A photo and video editor built around 55+ custom WebGL shaders. Effects stack like layers, video gets a timeline, and everything exports to PNG, GIF, MP4 or WebM. Both images above came out of it.',
  chips: ['glitch', 'distortion', 'colour', 'retro', 'style', 'face'],
  tech: 'Electron · React · Three.js · GLSL · FFmpeg · Zustand · MIT licence',
  links: [{ label: 'Source on GitHub', href: 'https://github.com/ColemanSWE/erosion-studio' }],
  images: [
    { src: '/textures/erosion-portrait.jpg', alt: 'Glitch portrait exported from Erosion Studio' },
    { src: '/textures/erosion-regions.png', alt: 'Glitch landscape exported from Erosion Studio' },
  ],
};

export const holoShader = {
  num: '002',
  title: 'Holographic shader',
  meta: 'Shader study for this website · 2026',
  body: [
    "The holographic finish on this site is a thin-film interference shader, the same physics that colours soap bubbles and oil on water. The film's thickness drifts across each surface, and the colour you see depends on the angle you look from. Move your cursor to turn the knot.",
    "The rest of the page runs through one WebGL layer: the header's 3D scene and every image are drawn as textures, and each pixel falls by its own noise value as you scroll.",
  ],
  tech: 'Three.js · GLSL · thin-film interference · one render layer for every image',
};

const FORMALIN_RELEASES = 'https://github.com/ColemanSWE/formalin/releases/latest/download';

export const formalin = {
  num: '003',
  title: 'Formalin',
  meta: 'Audio plugin · VST3 + CLAP · 2026',
  body: [
    'A tape-effect plugin you play by hand. The window is a specimen tank: hold the glass orb and the tape slows to a stop under your grip, spin it to scrub backwards, let go and it rushes back to live.',
    'Whatever the effect does to the sound happens to the picture too. Wow sways it, the reverb bleeds ink into the water, and a full stop fixes the specimen in clouded formalin.',
  ],
  chips: ['tape stop', 'wow & flutter', 'saturation', 'pitch', 'reverb', 'raymarched'],
  tech: 'Rust · nih-plug · egui · OpenGL / GLSL · GPL-3.0',
  downloads: [
    { label: 'Windows', href: `${FORMALIN_RELEASES}/Formalin-windows.zip` },
    { label: 'macOS', href: `${FORMALIN_RELEASES}/Formalin-macos.zip` },
    { label: 'Linux', href: `${FORMALIN_RELEASES}/Formalin-linux.zip` },
  ],
  links: [{ label: 'Source on GitHub', href: 'https://github.com/ColemanSWE/formalin' }],
  images: [
    {
      src: '/textures/formalin-held.jpg',
      alt: "Formalin's window: a glass orb with a creature inside, held like a magnet, with particles pulled into field lines around it",
    },
    {
      src: '/textures/formalin-hot.jpg',
      alt: 'Formalin with the drive turned up: the orb flattened and red, boiling, with ink drifting through the water',
    },
  ],
};

export const archive = [
  {
    title: 'HSL Live Tracker',
    desc: 'Real-time Helsinki public transport map over MQTT',
    tech: 'TypeScript',
    href: 'https://colemanswe.github.io/hsl-live-tracker/',
  },
  {
    title: 'Tachyon',
    desc: 'HTTP/1.1 forward proxy, built to learn Rust',
    tech: 'Rust · Tokio',
    href: 'https://github.com/ColemanSWE/tachyon',
  },
];

export const testimonial = {
  quote: 'Pappa codes better than he gives belly rubs. He deserves treats... I mean, a job.',
  by: 'Lulu, professional cat',
  photos: [
    { src: '/lulu/IMG_0790.jpg', alt: 'Lulu the cat' },
    { src: '/lulu/IMG_1215.jpg', alt: 'Lulu the cat again' },
  ],
};

export function generatePortfolioMetadata(): { title: string; description: string; keywords: string } {
  const years = yearsOfExperience();
  return {
    title: 'Coleman Rose · Senior Software Engineer',
    description: `Senior software engineer in Helsinki with ${years} years of experience. VFX pipeline tools and AI workflows at 255 PIX Studio, Erosion Studio, and Absolution Engine, a claims-desk horror game in Godot.`,
    keywords:
      'Coleman Rose, Senior Software Engineer, Staff Engineer, Helsinki, Finland, VFX pipeline, Nuke, DaVinci Resolve, ComfyUI, Python, TypeScript, React, Next.js, Three.js, WebGL, shaders, Godot, Absolution Engine, Erosion Studio',
  };
}
