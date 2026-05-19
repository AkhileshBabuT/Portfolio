export const profile = {
  name: 'Akhilesh Babu Tumati',
  title: 'Full-Stack & AI Engineer',
  location: 'Alexandria, VA',
  taglines: [
    'Shipping from infra to UI.',
    'Enterprise systems. AI agents. Measurable outcomes.',
    'Java · React · Next.js · Python · AWS',
  ],
  bio: "Full-stack and AI engineer with experience spanning enterprise (Honeywell, UPS), university research and platform work (Virginia Tech), and product-focused builds (AI try-on kiosks, fraud detection). Comfortable across the stack — Java/Spring Boot, TypeScript, React, Next.js, Python on the front, AWS, Kubernetes, Jenkins, MongoDB, PostgreSQL, Couchbase on the back — and equally at home shipping CI/CD pipelines, hardening security, or integrating generative AI. Treats Claude Code, MCP servers, and agent harnesses as everyday engineering tools.",
  publications: [
    {
      citation:
        'Tumati, A. B., Gangaraju, R., Mannepalli, B. R., & Alluri, B. K. (2023, January). Face Invariant Classification and Detection of Mythology Characters Using Custom Dataset (ClaDeMuC-CD). In 2023 Third International Conference on Advances in Electrical, Computing, Communication and Sustainable Technologies (ICAECT) (pp. 1-8). IEEE.',
      venue: 'IEEE ICAECT 2023',
      link: 'https://ieeexplore.ieee.org/abstract/document/10118094?casa_token=MAxIJAtwOfoAAAAA:VwT2GnnPPEfbWzXFn0kF8aLtjfFTzA7sHLyoKp0ctW5RUzHujZJ2k-uRXbpam0ThUp7-yiSn0g',
    },
    {
      citation:
        'Natarajan, K., Gangaraju, R., & Tumati, A. B. (2022). Hybrid ML and DL models for flood level prediction. International Journal of Health Sciences.',
      venue: 'IJHS 2022',
      link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4271767',
    },
  ],
  contact: { email: 'akhileshbabut24@vt.edu' },
  links: {
    linkedin: 'https://www.linkedin.com/in/akhilesh-babu-tumati',
    github: 'https://github.com/AkhileshBabuT',
    handshake: 'https://vt.joinhandshake.com/profiles/akhileshbabu',
    resumePdf: `${process.env.NODE_ENV === 'production' ? '/Portfolio' : ''}/assets/resume/Akhilesh_Babu_Resume.pdf`,
  },
};
