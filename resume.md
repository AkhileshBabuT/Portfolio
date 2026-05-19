# Resume — Akhilesh Babu Tumati

> Linked from [[job-search]]. Source of truth: LaTeX → PDF for submissions.
> Last updated: 2026-05-09

**Contact:** akhileshbabut24@vt.edu | +1 571-238-0184
**Links:** [LinkedIn](https://linkedin.com/in/akhilesh-babu-tumati) | [GitHub](https://github.com/AkhileshBabuT)

---

## About Me

Full-stack and AI engineer with experience spanning enterprise (Honeywell, UPS), university research and platform work (Virginia Tech), and product-focused builds (AI try-on kiosks, fraud detection). Comfortable across the stack — **Java/Spring Boot, TypeScript, React, Next.js, Python** on the front, **AWS, Kubernetes, Jenkins, MongoDB, PostgreSQL, Couchbase** on the back — and equally at home shipping CI/CD pipelines, hardening security, or integrating generative AI. Treat **Claude Code, MCP servers, and agent harnesses** as everyday engineering tools to accelerate architecture, codegen, and review. Bias toward measurable outcomes and ownership from infra to UI.

---

## Professional Experience

### Full Stack Developer (Part-time) — Virginia Tech
*June 2025 – December 2025*

- Developed a scalable **academic repository** using **Next.js 15 (React 19)** and **Express.js**, reducing initial FCP from approximately **2.4s to 1.4s (40%)** and supporting sub-second search across 10+ domains.
- Implemented a **serverless cloud infrastructure** on AWS (S3, CloudFront, VPC, Route53) via **CloudFormation**, selecting serverless to minimize operational overhead and pair cleanly with **MongoDB Atlas**, cutting operational costs by **25%** versus the EC2 baseline.
- Optimized **AWS Lambda** and **API Gateway** backends with **MongoDB connection pooling**, reducing cold-start latency from **980ms to 540ms (45%)** and routing API traffic via **EKS**-managed services to handle peak concurrent usage during ingestion windows.
- Hardened system security with **MFA, 5-tier RBAC**, and **JWT token blacklisting**, remediating **12 Critical CVEs** and achieving full compliance with university data governance standards.
- Accelerated delivery using **Claude Code** with **MongoDB, AWS, and Vercel skills** for direct cluster, infra, and deployment orchestration, plus **Playwright skills** for automated end-to-end browser testing — compressing review and refactor cycles via agent-driven workflows.

### Software Engineer (Contract) — UPS
*August 2023 – August 2024*

- Orchestrated production deployments for global logistics microservices using **Jenkins CI/CD**, automating build pipelines and ensuring high-fidelity, secure delivery to production clusters.
- Maintained **99.9% system availability** for logistics services by proactively authoring **8 Grafana alert rules** for Couchbase cluster health, reducing P1 SLA incidents during peak holiday traffic.
- Managed data integrity for **Couchbase NoSQL** clusters, performing high-fidelity document updates to ensure consistent analytics for global operations.
- Managed containerized lifecycles using **OpenShift** (**Kubernetes YAML**), reducing deployment configuration errors **from 9 to 7 per sprint (22%)** and monitoring cluster health via **Dynatrace** and **Grafana**.

### Software Developer Intern — Honeywell
*January 2023 – July 2023*

- Built reusable **Angular** UI modules backed by **Java Spring Boot** REST controllers, persisting data through **Hibernate ORM** following **SOLID design principles** — accelerating component reuse across 3+ feature teams.
- Managed **CI/CD pipelines** via **Bamboo**, **Bitbucket**, and **Jira** with **Coverity and Blackduck** security scans embedded in the build loop, ensuring synchronized enterprise deployments.
- Automated end-to-end user workflows using **Java Selenium and Katalon Studio**, reducing manual regression testing overhead by 30% and accelerating release cycles.

---

## Technical Skills

| Category                    | Stack                                                                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Languages**               | Java (Spring Boot), JavaScript (ES6+), TypeScript, Python, SQL, Node.js                                                                                                                                    |
| **Frontend**                | React 19, Next.js 15 (App Router), Angular, Tailwind CSS, Tremor UI, Responsive Design, PWA                                                                                                                |
| **Backend & APIs**          | REST APIs, GraphQL, FastAPI, Flask, Express.js, Socket.io, MCP, Google Gemini API, Hibernate, jQuery                                                                                                       |
| **AI/ML & GenAI**           | LLMs (Gemini, Claude, ChatGPT), RAG, Prompt Engineering, Embeddings, Vector DBs (PgVector, Mongo, Pinecone), LangChain, LlamaIndex, Ollama, Transformers.js, PyTorch, XGBoost, fal.ai                      |
| **AI-Assisted Development** | Claude Code, Claude Skills (MongoDB, Vercel, Playwright, Supabase, AWS), MCP server design & integration, Cursor, agent harnesses (multi-step / tool-use loops), prompt engineering, AI-driven code review |
| **Cloud & DevOps**          | AWS (Lambda, EC2, S3, CloudFront, VPC, EKS, API Gateway, CloudFormation, Route53), Docker, Kubernetes, Jenkins, Maven, CI/CD, OpenShift, Bamboo, Git                                                       |
| **Databases**               | MongoDB (Atlas), PostgreSQL (Prisma ORM), MySQL, Oracle, DynamoDB, Couchbase, NoSQL                                                                                                                        |

---

## Education

**Virginia Tech** — Master of Engineering, Computer Science | GPA 4.0/4.0
*August 2024 – May 2026*

**Vellore Institute of Technology** — B.Tech., Computer Science | GPA 3.5/4.0
*August 2023*

---

## Selected Projects

### MCCS Fraud Detection Platform
*VT Integrated Product Design (IPD) — MCCS Sponsor, Sep 2024 – Dec 2025*

- Engineered a real-time inference pipeline in **Python** using **XGBoost** trained on **GAN-augmented synthetic fraud samples** to address class imbalance, achieving sub-second risk classification across **15,000+ daily transactions**.
- Built a **RAG-powered Gemini chat assistant** using **Gemini embeddings** and **MongoDB Atlas Vector Search** for semantic retrieval over fraud cases and audit documents, producing **150+ monthly reports** and saving sponsor audit teams **12 hours/week**.
- Developed high-fidelity **React** dashboards using **Tremor** and **Recharts**, surfacing actionable insights into fraud patterns and audit compliance for sponsor stakeholders.

### Evol Jewels: AI-Powered Virtual Try-On Kiosk

- Engineered a high-impact retail kiosk using **Next.js 15** and **TypeScript**; integrated **fal.ai** generative workflows to improve virtual try-on image quality by 30% using reasoning-guided generation.
- **Awarded 2nd place at Fountane hackathon**; orchestrated catalog data using **Prisma ORM and PostgreSQL** with secure lead capture via QR-code integration and automated email notifications.

---

## Publications

**Tumati, A. B.**, "Face Invariant Classification and Detection of Mythology Characters Using Custom Dataset (ClaDeMuC-CD)." *2023 IEEE ICAECT.*

---

## Notes / Variants

- Master copy: this file (markdown) + LaTeX source for PDF rendering
- Tailoring: keep base intact, fork into `resume-<company>.md` if customizing
- Date last sent / version log:

| Date | Company | Variant | Notes |
|---|---|---|---|
| | | | |
