export const experience = [
  {
    company: 'Virginia Tech',
    role: 'Cloud / Full Stack Developer (Part-time)',
    dates: 'Jun 2025 – Dec 2025',
    location: 'Blacksburg, VA',
    highlights: ['25% lower infrastructure cost', 'AWS serverless'],
    bullets: [
      'Engineered CloudFormation and Serverless Framework templates to provision decoupled AWS Lambda and API Gateway services, cutting infrastructure costs by 25% versus EC2.',
      'Built web hosting on Amazon S3 and CloudFront with custom SSL/TLS certificates, CORS controls, and Helmet security headers.',
      'Hardened AWS IAM with least-privilege roles, VPC routing, SES MFA authentication, and JWT revocation verification across API Gateway endpoints.',
      'Set up CloudWatch metrics and alarms to monitor latency deviations, error rates, and invocation limits.',
    ],
  },
  {
    company: 'UPS',
    role: 'Software Engineer (DevOps & Infrastructure)',
    dates: 'Aug 2023 – Aug 2024',
    location: 'Baltimore, MD',
    highlights: ['20+ monthly releases', '35% faster queries'],
    bullets: [
      'Enabled 20+ monthly zero-downtime releases and lowered deployment error rates by 30% with declarative CI/CD, container promotion gates, and Jenkins rollback automation for Kubernetes and OpenShift.',
      'Reduced query latency by 35% across a Java and Couchbase lookup service serving 10M+ daily operations through profiling, memory tuning, and index redesign.',
      'Designed cross-region disaster-recovery synchronization across APAC, EU, and US clusters with Kafka, Red Hat AMQ Streams, MirrorMaker, and automated Azure snapshots.',
      'Worked with back-end engineering teams to troubleshoot containerized service bottlenecks, monitor cluster use, and automate post-deployment health checks.',
    ],
  },
  {
    company: 'Honeywell',
    role: 'Software Developer Intern',
    dates: 'Jan 2023 – Jul 2023',
    location: 'Hyderabad, India',
    highlights: ['85% regression coverage', '40% faster QA'],
    bullets: [
      'Automated CI/CD security and compliance gates with Coverity static analysis and Black Duck vulnerability checks.',
      'Cut manual QA release validation time by 40% and reached 85% automated regression coverage with 200+ Java Selenium and Katalon test suites.',
      'Built reusable Angular UI modules connected to Java Spring Boot REST microservices and JPA/Hibernate relational models.',
    ],
  },
];
