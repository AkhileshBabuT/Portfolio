export const profile = {
  name: 'Akhilesh Babu Tumati',
  title: 'Cloud / Full Stack Engineer',
  location: 'Alexandria, VA',
  taglines: [
    'From cloud infrastructure to polished interfaces.',
    'Reliable releases. Faster systems. Better experiences.',
    'AWS · Kubernetes · Java · Next.js · Python',
  ],
  bio: 'Cloud and full stack engineer who builds reliable systems from infrastructure to interface. At Virginia Tech I delivered serverless AWS services; at UPS I improved release pipelines, query performance, and disaster recovery; at Honeywell I strengthened testing and delivery. I also build AI-powered products, including real-time fraud monitoring and a computer vision retail kiosk.',
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
  contact: { email: 'akhileshtumati24@gmail.com', phone: '5712380184' },
  links: {
    linkedin: 'https://www.linkedin.com/in/akhilesh-babu-tumati',
    github: 'https://github.com/AkhileshBabuT',
    handshake: 'https://vt.joinhandshake.com/profiles/akhileshbabu',
    resumePdf: `${process.env.NODE_ENV === 'production' ? '/Portfolio' : ''}/assets/resume/Resume_akhileshtumati.pdf`,
  },
};
