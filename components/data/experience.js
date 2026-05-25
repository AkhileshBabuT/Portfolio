export const experience = [
  {
    company: 'Virginia Tech',
    role: 'Full Stack Developer (Part-Time)',
    dates: 'Jun 2025 – Dec 2025',
    location: 'Blacksburg, VA',
    bullets: [
      'Built a scalable academic content platform with Next.js 15 and Express.js — cut first-contentful-paint from 2.4s to 1.4s (40% faster) and enabled sub-second search across 10+ research domains.',
      'Designed a fully serverless AWS stack (S3, CloudFront, Lambda) via CloudFormation, pairing it with MongoDB Atlas to slash operational costs by 25% over a comparable EC2 setup.',
      'Tuned Lambda cold-start latency from 980ms down to 540ms (45%) through connection pooling and backend optimization, keeping the platform snappy even during peak ingestion windows.',
      'Locked down access with MFA, a 5-tier RBAC system, and JWT token blacklisting — bringing the platform into full compliance with university data governance standards.',
    ],
  },
  {
    company: 'Marine Corps Community Services (MCCS)',
    role: 'Full-Stack AI Engineer — Sponsored Capstone',
    dates: 'Sep 2024 – May 2025',
    location: 'Virginia Tech IPD',
    bullets: [
      'Built a real-time ML fraud detection pipeline in Python (XGBoost) for the MCCS e-commerce platform — used GAN-synthesized data to fix class imbalance and score 15,000+ daily transactions in under a second.',
      'Hit 95% accuracy and 98% recall after tuning and head-to-head comparison of multiple classifiers, catching suspicious transactions earlier and with fewer false alarms.',
      'Engineered a RAG assistant (Gemini, LangChain, FAISS) to auto-generate Explainable AI audit reports grounded in real fraud context — replaced ~12 hours/week of manual PDF prep with 150+ reports a month.',
      'Shipped a live monitoring dashboard (React, Node.js, Recharts) to surface fraud patterns and streamline model retraining, wired directly into the existing e-commerce infrastructure.',
    ],
  },
  {
    company: 'UPS',
    role: 'Software Engineer',
    dates: 'Aug 2023 – Aug 2024',
    location: 'Remote',
    bullets: [
      'Drove 20+ monthly zero-downtime releases for high-traffic logistics microservices through Jenkins CI/CD into OpenShift/Kubernetes, cutting deployment errors by 30% across UPS\'s global delivery network.',
      'Kept distributed Java services at 99.99% availability by wiring Grafana and Dynatrace alert rules to Couchbase NoSQL cluster health — catching and resolving P1 incidents before they hit customers.',
      'Owned schema design and query optimization for production Couchbase databases handling 10M+ daily address lookups, shaving average query latency by 35%.',
      'Executed global data migrations across APAC/EU/US using Red Hat AMQ Streams (Kafka) and MirrorMaker 2, ensuring synchronized production data and automated backups to Azure for disaster recovery.',
    ],
  },
  {
    company: 'Honeywell',
    role: 'Software Developer Engineer',
    dates: 'Jan 2023 – Jul 2023',
    location: 'Hyderabad, India',
    bullets: [
      'Shipped full-stack features on ASDS — a B2B e-commerce platform serving 500+ enterprise aviation clients — building 15+ reusable Angular components backed by Java Spring Boot + JPA ORM, cutting frontend dev time by 25%.',
      'Wrote 200+ end-to-end test cases for payment gateway and revenue-critical flows using Java Selenium and Katalon Studio, achieving 85% regression coverage and reducing QA cycle time by 40%.',
      'Embedded Coverity and Blackduck security scans into every CI/CD build via Bamboo and Bitbucket, cutting security vulnerabilities by 60% and ensuring zero critical-CVE deployments.',
    ],
  },
];
