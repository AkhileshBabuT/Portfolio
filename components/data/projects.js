export const projects = [
  {
    title: 'MCCS Real-Time Transaction Risk Platform',
    subtitle: 'Fraud intelligence / sponsored project',
    dates: 'Sep 2024 – May 2025',
    code: '01 / RISK ENGINE',
    metric: '15,000+',
    metricLabel: 'daily transactions',
    description: 'A high-throughput Python risk analysis platform for transaction monitoring and compliance audits.',
    bullets: [
      'Delivered sub-second decision latency across 15,000+ daily financial transactions.',
      'Automated 150+ monthly compliance audit packages with a Gemini RAG pipeline, saving 12 hours of manual preparation each week.',
      'Built real-time React and Node.js dashboards to track model drift, latency spikes, and system anomalies.',
    ],
    tech: ['Python', 'AWS', 'MongoDB Atlas', 'LangChain', 'React'],
  },
  {
    title: 'Nazeer and Nazeers Cloud E-Commerce Platform',
    subtitle: 'Full stack / DevOps',
    code: '02 / COMMERCE',
    metric: '23',
    metricLabel: 'versioned SQL migrations',
    description: 'A cloud commerce platform built around reliable data releases, inventory workflows, and access control.',
    bullets: [
      'Built database CI/CD and migration tracking across 23 versioned SQL migrations using PostgreSQL and Supabase.',
      'Enforced schema integrity, immutable ledgers, and row-level security policies.',
      'Automated containerized deployments and transactional email alerts for real-time inventory reservations.',
    ],
    tech: ['PostgreSQL', 'Supabase', 'Next.js', 'TypeScript'],
  },
  {
    title: 'Evol Jewels Computer Vision Kiosk',
    subtitle: 'Hackathon / 2nd place',
    code: '03 / VISION',
    metric: '2nd',
    metricLabel: 'hackathon place',
    description: 'An interactive edge-device retail kiosk that brings AI-powered virtual try-on into the shopping experience.',
    bullets: [
      'Built the kiosk with Next.js and Prisma ORM.',
      'Integrated GPU-accelerated cloud inference through fal.ai, with automated fallback pipelines.',
    ],
    tech: ['Docker', 'Next.js', 'PostgreSQL', 'Prisma', 'fal.ai'],
  },
];
