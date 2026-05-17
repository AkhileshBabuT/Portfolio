export const experience = [
  {
    company: 'Virginia Tech',
    role: 'Full Stack Developer (Part-Time)',
    dates: 'Jun 2025 – Dec 2025',
    location: 'Blacksburg, VA',
    bullets: [
      'Developed a scalable academic repository using Next.js 15 (React 19) and Express.js, reducing initial FCP from ~2.4s to 1.4s (40%) and supporting sub-second search across 10+ domains.',
      'Implemented serverless cloud infrastructure on AWS (S3, CloudFront, VPC, Route53) via CloudFormation, cutting operational costs by 25% versus the EC2 baseline.',
      'Optimized AWS Lambda and API Gateway backends with MongoDB connection pooling, reducing cold-start latency from 980ms to 540ms (45%).',
      'Hardened system security with MFA, 5-tier RBAC, and JWT token blacklisting, remediating 12 Critical CVEs and achieving full compliance with university data governance standards.',
    ],
  },
  {
    company: 'UPS',
    role: 'Software Engineer (Contract)',
    dates: 'Aug 2023 – Aug 2024',
    location: 'Remote',
    bullets: [
      'Orchestrated production deployments for global logistics microservices using Jenkins CI/CD, automating build pipelines for secure delivery to production clusters.',
      'Maintained 99.9% system availability for logistics services by authoring 8 Grafana alert rules for Couchbase cluster health, reducing P1 SLA incidents during peak holiday traffic.',
      'Managed containerized lifecycles using OpenShift (Kubernetes YAML), reducing deployment configuration errors from 9 to 7 per sprint (22%) and monitoring cluster health via Dynatrace and Grafana.',
    ],
  },
  {
    company: 'Honeywell',
    role: 'Software Developer Intern',
    dates: 'Jan 2023 – Jul 2023',
    location: 'Hyderabad, India',
    bullets: [
      'Built reusable Angular UI modules backed by Java Spring Boot REST controllers, persisting data through Hibernate ORM following SOLID design principles.',
      'Managed CI/CD pipelines via Bamboo, Bitbucket, and Jira with Coverity and Blackduck security scans embedded in the build loop.',
      'Automated end-to-end user workflows using Java Selenium and Katalon Studio, reducing manual regression testing overhead by 30%.',
    ],
  },
];
