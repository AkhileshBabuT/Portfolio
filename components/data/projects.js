export const projects = [
  {
    title: 'MCCS Fraud Detection Platform',
    subtitle: 'VT Integrated Product Design — MCCS Sponsor',
    description:
      'Real-time inference pipeline in Python using XGBoost trained on GAN-augmented synthetic fraud samples, achieving sub-second risk classification across 15,000+ daily transactions. Includes a RAG-powered Gemini chat assistant over fraud cases and React/Tremor dashboards.',
    tech: [
      { name: 'Python', slug: 'python' },
      { name: 'XGBoost', slug: 'scikitlearn' },
      { name: 'Gemini', slug: 'googlegemini' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'React', slug: 'react' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
  {
    title: 'Evol Jewels — Virtual Try-On Kiosk',
    subtitle: 'AI retail kiosk · Fountane Hackathon (2nd place)',
    description:
      'High-impact retail kiosk built with Next.js 15 and TypeScript, integrating fal.ai generative workflows to improve virtual try-on image quality by 30%. Catalog managed via Prisma ORM and PostgreSQL with QR-code lead capture.',
    tech: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Prisma', slug: 'prisma' },
      { name: 'PostgreSQL', slug: 'postgresql' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
  {
    title: 'CS Ethics Archive',
    subtitle: 'Virginia Tech — academic repository',
    description:
      'Scalable academic repository with sub-second search across 10+ domains, built on Next.js and Express with serverless AWS infrastructure and MongoDB Atlas. Hardened with MFA, 5-tier RBAC, and JWT token blacklisting.',
    tech: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Express', slug: 'express' },
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'MongoDB', slug: 'mongodb' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
];
