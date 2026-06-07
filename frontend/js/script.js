"use strict";

const state = {
  portfolio: null,
  certificateQuery: "",
  certificateDomain: "",
  showAllCertificates: false,
  galaxyFrame: null,
  galaxyCleanup: null
};

const CERTIFICATE_DOMAINS = [
  {
    id: "cybersecurity",
    title: "Cybersecurity & SOC",
    description: "Security operations, threat investigation, incident response, risk, compliance, ethical hacking, and defensive practices.",
    keywords: ["cyber", "security", "threat", "incident", "detection", "response", "forensic", "cryptograph", "encrypt", "hacking", "kali", "penetration", "cysa", "access control", "vulnerabil", "defense", "soc"]
  },
  {
    id: "networking",
    title: "Networking & Telecom Operations",
    description: "Network fundamentals, connectivity, service visibility, endpoints, and operational knowledge that supports my current DSOC work.",
    keywords: ["network", "networking", "endpoint", "telecom", "storage", "ccna", "routing", "switching"]
  },
  {
    id: "systems-cloud",
    title: "IT Systems & Cloud",
    description: "Cloud platforms, operating systems, hardware, system administration, technical support, and dependable IT service foundations.",
    keywords: ["cloud", "operating system", "system administration", "it support", "technical support", "hardware", "computer", "devops", "version control"]
  },
  {
    id: "data-software",
    title: "Software, Data & Databases",
    description: "Programming, automation, SQL, database administration, data foundations, and software engineering problem-solving.",
    keywords: ["database", "sql", "data", "python", "algorithm", "programming", "software", "visual basic", "oracle", "game development"]
  },
  {
    id: "ai",
    title: "AI & Emerging Technology",
    description: "Artificial intelligence, machine learning, generative AI, and prompt engineering for practical technical workflows.",
    keywords: ["artificial intelligence", "machine learning", "generative ai", "prompt", "introduction to ai", " ai "]
  },
  {
    id: "professional",
    title: "Professional & Operations",
    description: "Project delivery, business analysis, career readiness, and cross-functional skills that support reliable technical work.",
    keywords: ["project management", "business analysis", "marketing", "job search", "resume", "career"]
  },
  {
    id: "engineering",
    title: "Engineering Foundations",
    description: "Additional technical foundations that strengthen how I learn, analyze systems, and contribute across engineering teams.",
    keywords: []
  }
];

const FALLBACK_PORTFOLIO = {
  "profile": {
    "name": "Janlyn B. Rustila",
    "brand": "rustila.dev",
    "role": "Computer Engineering Student & Network Surveillance Engineer Intern",
    "headline": "Globe Telecom DSOC | Telecom & Network Operations | Cybersecurity",
    "summary": "Computer Engineering student and Network Surveillance Engineer Intern at Globe Telecom DSOC. I combine hands-on telecom operations experience with certificate-backed knowledge and applied engineering work, including a YOLOv8n-powered thesis for psoriasis and eczema screening.",
    "status": "Globe Telecom DSOC intern",
    "location": "San Juan, Alaminos, Laguna, Philippines",
    "phone": "+63 976 353 2039",
    "email": "janlynrustila01@gmail.com",
    "school": "Lyceum of the Philippines University - Laguna",
    "focus": [
      "Network surveillance + incident operations",
      "Cybersecurity + SOC readiness",
      "Automation + systems engineering"
    ],
    "valueProps": [
      {
        "title": "Live telecom operations exposure",
        "description": "Currently supports Globe Telecom DSOC workflows involving real-time network monitoring, incident tickets, troubleshooting, escalation, and coordination with technical teams."
      },
      {
        "title": "Certificate-backed technical range",
        "description": "Completed 100 credentials across cybersecurity, networking, IT support, cloud, databases, data, AI, software, and project operations, with uploaded evidence available in this portfolio."
      },
      {
        "title": "Engineer who connects systems",
        "description": "Combines operational discipline with hands-on projects in embedded systems, IoT, automation, computer vision, security, and machine learning."
      }
    ],
    "snapshot": [
      {
        "label": "Current role",
        "value": "Network Surveillance Engineer Intern, Globe Telecom DSOC."
      },
      {
        "label": "Best fit",
        "value": "Network operations, NOC/SOC, cybersecurity, IT infrastructure, telecom, and technical operations roles."
      },
      {
        "label": "Professional edge",
        "value": "Live operations exposure supported by 100 credentials and practical engineering projects."
      }
    ],
    "contactPitch": "Computer Engineering student and Globe Telecom DSOC intern interested in network operations, NOC/SOC, cybersecurity, IT infrastructure, telecom, AI, and systems engineering opportunities.",
    "socials": []
  },
  "integrations": {
    "appsScript": {
      "scriptId": "1Zq5yESFCb3UuwvvNcC9fGU13Tq-5YkoPUTr2cfJ8xqVepZqkPreO4hKg",
      "deploymentId": "",
      "webAppUrl": "",
      "description": "Google Apps Script source for portfolio certificates/content. Add a deployed web app URL here when available."
    }
  },
  "stats": [
    {
      "value": "DSOC",
      "label": "active telecom intern",
      "note": "Supporting live network surveillance and incident operations at Globe Telecom.",
      "order": 1
    },
    {
      "value": "100",
      "label": "certificates earned",
      "note": "Verified learning across cybersecurity, networking, IT, cloud, data, AI, and software.",
      "order": 2
    },
    {
      "value": "6",
      "label": "engineering projects",
      "note": "Applied work across embedded systems, IoT, AI, security, and automation.",
      "order": 3
    },
    {
      "value": "7+",
      "label": "technical domains",
      "note": "Telecom, networking, cybersecurity, systems, cloud, data, AI, and embedded engineering.",
      "order": 4
    }
  ],
  "experience": [
    {
      "role": "Network Surveillance Engineer (DSOC Intern)",
      "company": "Globe Telecom | Makati, National Capital Region, Philippines | On-site",
      "period": "Apr 2026 - Present",
      "description": "Works under the Domain Service Operations Center (DSOC), supporting real-time network performance monitoring, incident ticket handling, initial troubleshooting, and escalation processes. Gains hands-on experience with telecom systems, service management tools, and coordination across technical teams to help maintain service reliability.",
      "tags": [
        "network surveillance",
        "incident ticketing",
        "telecom operations",
        "troubleshooting",
        "escalation",
        "cross-functional coordination"
      ],
      "order": 1
    },
    {
      "role": "YouTube Editor",
      "company": "Remote Work",
      "period": "Jan 2021 - Jul 2021",
      "description": "Produced edited video content for remote clients while managing files, deadlines, revisions, publishing schedules, and quality checks. This experience strengthened discipline in communication, organized workflows, and delivering output with minimal supervision.",
      "tags": [
        "remote work",
        "deadline management",
        "content production",
        "quality checks",
        "client communication"
      ],
      "order": 2
    }
  ],
  "projects": [
    {
      "title": "ROBODERM: AI-Assisted Skin Disease Screening System",
      "type": "thesis | YOLOv8n | computer vision | healthcare AI",
      "description": "Developed a full-stack thesis system that uses a trained YOLOv8n model to screen skin images for psoriasis and eczema. The system presents confidence-based results as screening support and routes cases for doctor review instead of treating AI output as a final diagnosis.",
      "impact": [
        "Implemented image preprocessing, YOLO inference, lesion bounding boxes, confidence scoring, attention heatmaps, and normal/no-detection handling.",
        "Built connected patient, doctor, and admin workflows with scan history, doctor validation and correction, referral routing, notifications, and generated PDF reports.",
        "Designed the deployment flow for Flask-based web access, remote inference support, and a Raspberry Pi 5 screening node."
      ],
      "tags": [
        "YOLOv8n",
        "Python",
        "Flask",
        "Computer Vision",
        "Raspberry Pi 5",
        "Healthcare AI"
      ],
      "featured": true,
      "order": 1
    },
    {
      "title": "CampusVital: Smart Health Monitoring Kiosk",
      "type": "embedded systems | IoT | health technology",
      "description": "A self-service campus health kiosk concept that combines sensors, embedded control, and real-time user feedback for basic vital monitoring workflows.",
      "impact": [
        "Built around a real campus wellness use case with repeatable measurement flow.",
        "Connects hardware readings, interface feedback, and practical health-tech workflow design."
      ],
      "tags": [
        "Raspberry Pi",
        "Embedded Systems",
        "Sensors",
        "Health IoT"
      ],
      "featured": false,
      "order": 2
    },
    {
      "title": "SumoBot - Autonomous Sumo Robot",
      "type": "autonomous robotics | embedded logic",
      "description": "Designed and built an autonomous robot that detects opponents and responds with movement strategies using sensor input and motor control.",
      "impact": [
        "Practiced tuning real-time behavior from sensor readings to motor decisions.",
        "Strengthened debugging skills through repeated physical testing and adjustment."
      ],
      "tags": [
        "Motor Control",
        "Sensors",
        "Embedded C"
      ],
      "featured": false,
      "order": 3
    },
    {
      "title": "Line-Following Robot",
      "type": "robotics | real-time control",
      "description": "Developed a robot that follows a path by reading sensor values and applying embedded control logic for stable movement.",
      "impact": [
        "Applied real-time decision-making for navigation accuracy.",
        "Improved consistency through sensor calibration and motor-response testing."
      ],
      "tags": [
        "Sensors",
        "Real-Time Logic",
        "Embedded"
      ],
      "featured": false,
      "order": 4
    },
    {
      "title": "Smart Security System (ESP + Telegram Auth)",
      "type": "IoT | security | real-time auth",
      "description": "Built a smart security prototype where visitor-triggered events can notify the homeowner through Telegram for real-time approval and monitoring.",
      "impact": [
        "Demonstrates event-driven IoT thinking and remote notification workflows.",
        "Connects embedded devices, user authorization, and practical home-security logic."
      ],
      "tags": [
        "ESP32",
        "Raspberry Pi",
        "Telegram API",
        "IoT"
      ],
      "featured": false,
      "order": 5
    },
    {
      "title": "Real-Time Grocery Stock Monitor",
      "type": "Python | automation | computer vision",
      "description": "Created a Python workflow for QR and barcode scanning to support item identification, structured lookup, and inventory-style data handling.",
      "impact": [
        "Automates repetitive product identification steps using computer vision tools.",
        "Shows practical data processing from captured input to structured records."
      ],
      "tags": [
        "Python",
        "Computer Vision",
        "Automation"
      ],
      "featured": false,
      "order": 6
    }
  ],
  "skills": [
    {
      "title": "Telecom & Network Operations",
      "items": [
        "Network Surveillance",
        "Incident Ticketing",
        "Troubleshooting & Escalation",
        "Cisco Networking",
        "Network Security",
        "Service Operations"
      ],
      "order": 1
    },
    {
      "title": "Cybersecurity & SOC",
      "items": [
        "Security Operations",
        "Threat Investigation",
        "Incident Response",
        "Linux & SQL",
        "Ethical Hacking Fundamentals",
        "Risk & Compliance"
      ],
      "order": 2
    },
    {
      "title": "Systems, Software & Data",
      "items": [
        "Python",
        "SQL & Databases",
        "Cloud Fundamentals",
        "IT Support",
        "System Administration",
        "Automation Scripts"
      ],
      "order": 3
    },
    {
      "title": "Embedded, AI & Delivery",
      "items": [
        "Embedded Systems & IoT",
        "Raspberry Pi & Sensors",
        "Machine Learning",
        "Computer Vision",
        "Documentation & Testing",
        "Project Coordination"
      ],
      "order": 4
    }
  ],
  "certifications": [
    {
      "id": "a-tour-of-google-cloud-hands-on-labs",
      "issuer": "Google Cloud",
      "name": "A Tour of Google Cloud Hands-on Labs",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/a-tour-of-google-cloud-hands-on-labs.pdf",
      "order": 1
    },
    {
      "id": "advanced-oracle-database-administration",
      "issuer": "Packt",
      "name": "Advanced Oracle Database Administration",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/advanced-oracle-database-administration.pdf",
      "order": 2
    },
    {
      "id": "comptia-network",
      "issuer": "Infosec",
      "name": "CompTIA Network+",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/comptia-network.pdf",
      "order": 3
    },
    {
      "id": "database-structures-and-management-with-mysql",
      "issuer": "Meta",
      "name": "Database Structures and Management with MySQL",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/database-structures-and-management-with-mysql.pdf",
      "order": 4
    },
    {
      "id": "endpoints-and-systems",
      "issuer": "Cisco",
      "name": "Endpoints and Systems",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/endpoints-and-systems.pdf",
      "order": 5
    },
    {
      "id": "ethical-hacking-with-kali-linux",
      "issuer": "IBM",
      "name": "Ethical Hacking with Kali Linux",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/ethical-hacking-with-kali-linux.pdf",
      "order": 6
    },
    {
      "id": "exploitation-and-penetration-testing-with",
      "issuer": "IBM",
      "name": "Exploitation and Penetration Testing with Metasploit",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/exploitation-and-penetration-testing-with.pdf",
      "order": 7
    },
    {
      "id": "foundations-of-oracle-database-administration",
      "issuer": "Packt",
      "name": "Foundations of Oracle Database Administration",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/foundations-of-oracle-database-administration.pdf",
      "order": 8
    },
    {
      "id": "introduction-to-data-engineering",
      "issuer": "IBM",
      "name": "Introduction to Data Engineering",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/introduction-to-data-engineering.pdf",
      "order": 9
    },
    {
      "id": "introduction-to-databases",
      "issuer": "Meta",
      "name": "Introduction to Databases",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/introduction-to-databases.pdf",
      "order": 10
    },
    {
      "id": "introduction-to-ethical-hacking-principles",
      "issuer": "SkillUp",
      "name": "Introduction to Ethical Hacking Principles",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/introduction-to-ethical-hacking-principles.pdf",
      "order": 11
    },
    {
      "id": "network-security",
      "issuer": "Cisco",
      "name": "Network Security",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/network-security.pdf",
      "order": 12
    },
    {
      "id": "oracle-database",
      "issuer": "Packt",
      "name": "Oracle Database Administration from Zero to Hero",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/oracle-database.pdf",
      "order": 13
    },
    {
      "id": "sql-foundations",
      "issuer": "Microsoft",
      "name": "SQL Foundations",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/sql-foundations.pdf",
      "order": 14
    },
    {
      "id": "threat-investigation",
      "issuer": "Cisco",
      "name": "Threat Investigation",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/threat-investigation.pdf",
      "order": 15
    },
    {
      "id": "version-control",
      "issuer": "Meta",
      "name": "Version Control",
      "issueDate": "2026-05",
      "credentialUrl": "/certificates/version-control.pdf",
      "order": 16
    },
    {
      "id": "comptia-security",
      "issuer": "LearnKartS",
      "name": "CompTIA Security+ Certification Preparation",
      "issueDate": "2026-03",
      "credentialUrl": "/certificates/comptia-security.pdf",
      "order": 17
    },
    {
      "id": "cybersecurity-governance-and-compliance",
      "issuer": "LearnKartS",
      "name": "Cybersecurity Governance and Compliance",
      "issueDate": "2026-03",
      "credentialUrl": "/certificates/cybersecurity-governance-and-compliance.pdf",
      "order": 18
    },
    {
      "id": "cybersecurity-operations-and-controls",
      "issuer": "LearnKartS",
      "name": "Cybersecurity Operations and Controls",
      "issueDate": "2026-03",
      "credentialUrl": "/certificates/cybersecurity-operations-and-controls.pdf",
      "order": 19
    },
    {
      "id": "cybersecurity-threats-and-defense",
      "issuer": "LearnKartS",
      "name": "Cybersecurity Threats and Defense",
      "issueDate": "2026-03",
      "credentialUrl": "/certificates/cybersecurity-threats-and-defense.pdf",
      "order": 20
    },
    {
      "id": "information-security-foundations",
      "issuer": "LearnKartS",
      "name": "Information Security Foundations",
      "issueDate": "2026-03",
      "credentialUrl": "/certificates/information-security-foundations.pdf",
      "order": 21
    },
    {
      "id": "accelerate-your-job-search-with-ai",
      "issuer": "Google",
      "name": "Accelerate Your Job Search with AI",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/accelerate-your-job-search-with-ai.pdf",
      "order": 22
    },
    {
      "id": "access-control-concepts",
      "issuer": "ISC2",
      "name": "Access Control Concepts",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/access-control-concepts.pdf",
      "order": 23
    },
    {
      "id": "assets-threats-and-vulnerabilities",
      "issuer": "Google",
      "name": "Assets, Threats, and Vulnerabilities",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/assets-threats-and-vulnerabilities.pdf",
      "order": 24
    },
    {
      "id": "automate-cybersecurity-tasks-with-python",
      "issuer": "Google",
      "name": "Automate Cybersecurity Tasks with Python",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/automate-cybersecurity-tasks-with-python.pdf",
      "order": 25
    },
    {
      "id": "basics-of-cisco-networking",
      "issuer": "LearnQuest",
      "name": "Basics of Cisco Networking",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/basics-of-cisco-networking.pdf",
      "order": 26
    },
    {
      "id": "computer-networks-and-network-security",
      "issuer": "IBM",
      "name": "Computer Networks and Network Security",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/computer-networks-and-network-security.pdf",
      "order": 27
    },
    {
      "id": "connect-and-protect-networks-and-network",
      "issuer": "Google",
      "name": "Connect and Protect: Networks and Network Security",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/connect-and-protect-networks-and-network.pdf",
      "order": 28
    },
    {
      "id": "cybersecurity-architecture",
      "issuer": "IBM",
      "name": "Cybersecurity Architecture",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/cybersecurity-architecture.pdf",
      "order": 29
    },
    {
      "id": "comptia-security-cysa",
      "issuer": "IBM",
      "name": "Cybersecurity Assessment: CompTIA Security+ & CYSA+",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/comptia-security-cysa.pdf",
      "order": 30
    },
    {
      "id": "cybersecurity-case-studies-and-capstone-project",
      "issuer": "IBM",
      "name": "Cybersecurity Case Studies and Capstone Project",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/cybersecurity-case-studies-and-capstone-project.pdf",
      "order": 31
    },
    {
      "id": "cybersecurity-compliance-framework-standards-regulations",
      "issuer": "IBM",
      "name": "Cybersecurity Compliance Framework, Standards & Regulations",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/cybersecurity-compliance-framework-standards-regulations.pdf",
      "order": 32
    },
    {
      "id": "cybersecurity",
      "issuer": "IBM Skills Network",
      "name": "Cybersecurity Fundamentals",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/cybersecurity.pdf",
      "order": 33
    },
    {
      "id": "cybersecurity-job-search-resume-and-interview",
      "issuer": "IBM",
      "name": "Cybersecurity Job Search, Resume, and Interview Prep",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/cybersecurity-job-search-resume-and-interview.pdf",
      "order": 34
    },
    {
      "id": "database-essentials-and-vulnerabilities",
      "issuer": "IBM",
      "name": "Database Essentials and Vulnerabilities",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/database-essentials-and-vulnerabilities.pdf",
      "order": 35
    },
    {
      "id": "encryption-and-cryptography-essentials",
      "issuer": "IBM",
      "name": "Encryption and Cryptography Essentials",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/encryption-and-cryptography-essentials.pdf",
      "order": 36
    },
    {
      "id": "generative-ai-boost-your-cybersecurity-career",
      "issuer": "IBM",
      "name": "Generative AI: Boost Your Cybersecurity Career",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/generative-ai-boost-your-cybersecurity-career.pdf",
      "order": 37
    },
    {
      "id": "google-cybersecurity",
      "issuer": "Google",
      "name": "Google Cybersecurity Professional Certificate",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/google-cybersecurity.pdf",
      "order": 38
    },
    {
      "id": "google-it-support",
      "issuer": "Google",
      "name": "Google IT Support Professional Certificate",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/google-it-support.pdf",
      "order": 39
    },
    {
      "id": "ibm-cybersecurity-analyst",
      "issuer": "IBM",
      "name": "IBM Cybersecurity Analyst Professional Certificate",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/ibm-cybersecurity-analyst.pdf",
      "order": 40
    },
    {
      "id": "ibm-generative-ai-for",
      "issuer": "IBM",
      "name": "IBM Generative AI for Cybersecurity Professionals",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/ibm-generative-ai-for.pdf",
      "order": 41
    },
    {
      "id": "incident-response-and-digital-forensics",
      "issuer": "IBM",
      "name": "Incident Response and Digital Forensics",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/incident-response-and-digital-forensics.pdf",
      "order": 42
    },
    {
      "id": "incident-response-bc-and-dr-concepts",
      "issuer": "ISC2",
      "name": "Incident Response, BC, and DR Concepts",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/incident-response-bc-and-dr-concepts.pdf",
      "order": 43
    },
    {
      "id": "introduction-to-ai",
      "issuer": "Google",
      "name": "Introduction to AI",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-ai.pdf",
      "order": 44
    },
    {
      "id": "introduction-to-business-analysis",
      "issuer": "IBM",
      "name": "Introduction to Business Analysis",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-business-analysis.pdf",
      "order": 45
    },
    {
      "id": "introduction-to-cloud-computing",
      "issuer": "IBM",
      "name": "Introduction to Cloud Computing",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-cloud-computing.pdf",
      "order": 46
    },
    {
      "id": "introduction-to-computers",
      "issuer": "Microsoft",
      "name": "Introduction to Computers",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-computers.pdf",
      "order": 47
    },
    {
      "id": "introduction-to-cybersecurity-essentials",
      "issuer": "IBM",
      "name": "Introduction to Cybersecurity Essentials",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-cybersecurity-essentials.pdf",
      "order": 48
    },
    {
      "id": "introduction-to-cybersecurity-tools-cyberattacks",
      "issuer": "IBM",
      "name": "Introduction to Cybersecurity Tools & Cyberattacks",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-cybersecurity-tools-cyberattacks.pdf",
      "order": 49
    },
    {
      "id": "introduction-to-hardware-and-operating-systems",
      "issuer": "IBM",
      "name": "Introduction to Hardware and Operating Systems",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-hardware-and-operating-systems.pdf",
      "order": 50
    },
    {
      "id": "introduction-to-networking-and-storage",
      "issuer": "IBM",
      "name": "Introduction to Networking and Storage",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-networking-and-storage.pdf",
      "order": 51
    },
    {
      "id": "introduction-to-software-programming-and",
      "issuer": "IBM",
      "name": "Introduction to Software, Programming, and Databases",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/introduction-to-software-programming-and.pdf",
      "order": 52
    },
    {
      "id": "it-security-defense-against-the-digital-dark-arts",
      "issuer": "Google",
      "name": "IT Security: Defense against the digital dark arts",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/it-security-defense-against-the-digital-dark-arts.pdf",
      "order": 53
    },
    {
      "id": "network-security1",
      "issuer": "ISC2",
      "name": "Network Security",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/network-security1.pdf",
      "order": 54
    },
    {
      "id": "operating-systems-and-you-becoming-a-power",
      "issuer": "Google",
      "name": "Operating Systems and You: Becoming a Power User",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/operating-systems-and-you-becoming-a-power.pdf",
      "order": 55
    },
    {
      "id": "operating-systems-overview-administration-and",
      "issuer": "IBM",
      "name": "Operating Systems: Overview, Administration, and Security",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/operating-systems-overview-administration-and.pdf",
      "order": 56
    },
    {
      "id": "penetration-testing-threat-hunting-and",
      "issuer": "IBM",
      "name": "Penetration Testing, Threat Hunting, and Cryptography",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/penetration-testing-threat-hunting-and.pdf",
      "order": 57
    },
    {
      "id": "play-it-safe-manage-security-risks",
      "issuer": "Google",
      "name": "Play It Safe: Manage Security Risks",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/play-it-safe-manage-security-risks.pdf",
      "order": 58
    },
    {
      "id": "put-it-to-work-prepare-for-cybersecurity-jobs",
      "issuer": "Google",
      "name": "Put It to Work: Prepare for Cybersecurity Jobs",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/put-it-to-work-prepare-for-cybersecurity-jobs.pdf",
      "order": 59
    },
    {
      "id": "security-operations",
      "issuer": "ISC2",
      "name": "Security Operations",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/security-operations.pdf",
      "order": 60
    },
    {
      "id": "security-principles",
      "issuer": "ISC2",
      "name": "Security Principles",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/security-principles.pdf",
      "order": 61
    },
    {
      "id": "sound-the-alarm-detection-and-response",
      "issuer": "Google",
      "name": "Sound the Alarm: Detection and Response",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/sound-the-alarm-detection-and-response.pdf",
      "order": 62
    },
    {
      "id": "start-writing-prompts-like-a-pro",
      "issuer": "Google",
      "name": "Start Writing Prompts like a Pro",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/start-writing-prompts-like-a-pro.pdf",
      "order": 63
    },
    {
      "id": "system-administration-and-it-infrastructure",
      "issuer": "Google",
      "name": "System Administration and IT Infrastructure Services",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/system-administration-and-it-infrastructure.pdf",
      "order": 64
    },
    {
      "id": "the-bits-and-bytes-of-computer-networking",
      "issuer": "Google",
      "name": "The Bits and Bytes of Computer Networking",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/the-bits-and-bytes-of-computer-networking.pdf",
      "order": 65
    },
    {
      "id": "the-foundations-of-cybersecurity",
      "issuer": "Kennesaw State University",
      "name": "The Foundations of Cybersecurity",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/the-foundations-of-cybersecurity.pdf",
      "order": 66
    },
    {
      "id": "tools-of-the-trade-linux-and-sql",
      "issuer": "Google",
      "name": "Tools of the Trade: Linux and SQL",
      "issueDate": "2026-01",
      "credentialUrl": "/certificates/tools-of-the-trade-linux-and-sql.pdf",
      "order": 67
    },
    {
      "id": "crash-course-on-python",
      "issuer": "Google",
      "name": "Crash Course on Python",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/crash-course-on-python.pdf",
      "order": 68
    },
    {
      "id": "foundations-of-cybersecurity",
      "issuer": "Google",
      "name": "Foundations of Cybersecurity",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/foundations-of-cybersecurity.pdf",
      "order": 69
    },
    {
      "id": "foundations-data-data-everywhere",
      "issuer": "Google",
      "name": "Foundations: Data, Data, Everywhere",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/foundations-data-data-everywhere.pdf",
      "order": 70
    },
    {
      "id": "generative-ai-introduction-and-applications",
      "issuer": "IBM",
      "name": "Generative AI: Introduction and Applications",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/generative-ai-introduction-and-applications.pdf",
      "order": 71
    },
    {
      "id": "generative-ai-prompt-engineering-basics",
      "issuer": "IBM",
      "name": "Generative AI: Prompt Engineering Basics",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/generative-ai-prompt-engineering-basics.pdf",
      "order": 72
    },
    {
      "id": "introduction-to-artificial-intelligence-ai",
      "issuer": "IBM",
      "name": "Introduction to Artificial Intelligence (AI)",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/introduction-to-artificial-intelligence-ai.pdf",
      "order": 73
    },
    {
      "id": "ibm-intro-cybersecurity",
      "issuer": "IBM",
      "name": "Introduction to Cybersecurity",
      "issueDate": "2025-12",
      "credentialUrl": "",
      "order": 74
    },
    {
      "id": "introduction-to-cybersecurity-careers",
      "issuer": "IBM",
      "name": "Introduction to Cybersecurity Careers",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/introduction-to-cybersecurity-careers.pdf",
      "order": 75
    },
    {
      "id": "introduction-to-devops",
      "issuer": "IBM",
      "name": "Introduction to DevOps",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/introduction-to-devops.pdf",
      "order": 76
    },
    {
      "id": "introduction-to-software-engineering",
      "issuer": "IBM",
      "name": "Introduction to Software Engineering",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/introduction-to-software-engineering.pdf",
      "order": 77
    },
    {
      "id": "machine-learning-with-python",
      "issuer": "IBM",
      "name": "Machine Learning with Python",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/machine-learning-with-python.pdf",
      "order": 78
    },
    {
      "id": "security-operations-center-soc",
      "issuer": "Cisco",
      "name": "Security Operations Center (SOC)",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/security-operations-center-soc.pdf",
      "order": 79
    },
    {
      "id": "what-is-data-science",
      "issuer": "IBM",
      "name": "What is Data Science?",
      "issueDate": "2025-12",
      "credentialUrl": "/certificates/what-is-data-science.pdf",
      "order": 80
    },
    {
      "id": "cisco-ccna-srwe",
      "issuer": "CISCO",
      "name": "CCNA: Switching, Routing & Wireless Essentials",
      "issueDate": "2025-10",
      "credentialUrl": "",
      "order": 81
    },
    {
      "id": "cisco-networking-devices",
      "issuer": "CISCO",
      "name": "Networking Devices and Initial Configuration",
      "issueDate": "2025-05",
      "credentialUrl": "",
      "order": 82
    },
    {
      "id": "cisco-data-analytics",
      "issuer": "CISCO",
      "name": "Data Analytics Essentials",
      "issueDate": "2025-04",
      "credentialUrl": "",
      "order": 83
    },
    {
      "id": "cisco-network-basics",
      "issuer": "CISCO",
      "name": "Network Basics",
      "issueDate": "2025-04",
      "credentialUrl": "",
      "order": 84
    },
    {
      "id": "algorithms-for-searching-sorting-and-indexing",
      "issuer": "University of Colorado Boulder",
      "name": "Algorithms for Searching, Sorting, and Indexing",
      "issueDate": "2024-07",
      "credentialUrl": "/certificates/algorithms-for-searching-sorting-and-indexing.pdf",
      "order": 85
    },
    {
      "id": "python-data-structures",
      "issuer": "University of Michigan",
      "name": "Python Data Structures",
      "issueDate": "2024-07",
      "credentialUrl": "/certificates/python-data-structures.pdf",
      "order": 86
    },
    {
      "id": "itg-bosh-safety-officer",
      "issuer": "ITG",
      "name": "BOSH Training Course for Safety Officer",
      "issueDate": "2024-05",
      "credentialUrl": "",
      "order": 87
    },
    {
      "id": "cisco-pcap-python",
      "issuer": "CISCO",
      "name": "PCAP - Programming Essentials in Python",
      "issueDate": "2024-05",
      "credentialUrl": "",
      "order": 88
    },
    {
      "id": "verify-at",
      "issuer": "Deprecated Guided Projects",
      "name": "Application of Data Analysis in Business with R Programming",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/verify-at.pdf",
      "order": 89
    },
    {
      "id": "foundations-of-computer-science",
      "issuer": "LearnQuest",
      "name": "Foundations of Computer Science",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/foundations-of-computer-science.pdf",
      "order": 90
    },
    {
      "id": "foundations-of-data-science",
      "issuer": "Google",
      "name": "Foundations of Data Science",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/foundations-of-data-science.pdf",
      "order": 91
    },
    {
      "id": "foundations-of-digital-marketing-and-e-commerce",
      "issuer": "Google",
      "name": "Foundations of Digital Marketing and E-commerce",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/foundations-of-digital-marketing-and-e-commerce.pdf",
      "order": 92
    },
    {
      "id": "foundations-of-project-management",
      "issuer": "Google",
      "name": "Foundations of Project Management",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/foundations-of-project-management.pdf",
      "order": 93
    },
    {
      "id": "introduction-to-basic-game-development-using",
      "issuer": "Coursera",
      "name": "Introduction to Basic Game Development using Scratch",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/introduction-to-basic-game-development-using.pdf",
      "order": 94
    },
    {
      "id": "introduction-to-computer",
      "issuer": "LearnQuest",
      "name": "Introduction to Computer Programming with Visual Basic",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/introduction-to-computer.pdf",
      "order": 95
    },
    {
      "id": "introduction-to-generative-ai",
      "issuer": "Google Cloud",
      "name": "Introduction to Generative AI",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/introduction-to-generative-ai.pdf",
      "order": 96
    },
    {
      "id": "introduction-to-visual-basic-programming",
      "issuer": "LearnQuest",
      "name": "Introduction to Visual Basic Programming",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/introduction-to-visual-basic-programming.pdf",
      "order": 97
    },
    {
      "id": "technical-support-fundamentals",
      "issuer": "Google",
      "name": "Technical Support Fundamentals",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/technical-support-fundamentals.pdf",
      "order": 98
    },
    {
      "id": "visual-basic-programming-classes-and-collections",
      "issuer": "LearnQuest",
      "name": "Visual Basic Programming: Classes and Collections",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/visual-basic-programming-classes-and-collections.pdf",
      "order": 99
    },
    {
      "id": "visual-basic-programming-inheritance-and",
      "issuer": "LearnQuest",
      "name": "Visual Basic Programming: Inheritance and Polymorphism",
      "issueDate": "2023-10",
      "credentialUrl": "/certificates/visual-basic-programming-inheritance-and.pdf",
      "order": 100
    }
  ],
  "leadership": [
    {
      "organization": "Mechatronics & Robotics Society of the Philippines",
      "role": "Treasurer",
      "period": "2023 - Present",
      "description": "Managed funds, budgeting, financial records, and resource planning for organization projects and activities. This role supports my ability to handle responsibility, accuracy, and team coordination.",
      "tags": [
        "Finance",
        "Budgeting",
        "Leadership",
        "Record Keeping"
      ],
      "order": 1
    },
    {
      "organization": "LPU Pirates Esports",
      "role": "Auditor",
      "period": "2023 - 2024",
      "description": "Reviewed financial records for accuracy and transparency, assisted with expense tracking, and supported reporting for organization activities.",
      "tags": [
        "Audit",
        "Financial Compliance",
        "Reporting",
        "Accountability"
      ],
      "order": 2
    }
  ]
};

const $ = selector => document.querySelector(selector);

function create(tag, options = {}, children = []) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.text !== undefined) el.textContent = options.text;
  if (options.html !== undefined) el.innerHTML = options.html;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) el.setAttribute(key, value);
    });
  }
  children.filter(Boolean).forEach(child => el.append(child));
  return el;
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function renderTags(tags = []) {
  return create("div", { className: "tag-list" }, tags.map(tag => create("span", { className: "tag", text: tag })));
}

function renderName(name) {
  const h1 = $("[data-name]");
  const parts = String(name || "").split(" ");
  const last = parts.pop() || "";
  const first = parts.join(" ") || name;
  h1.textContent = "";
  h1.append(document.createTextNode(first));
  h1.append(create("span", { text: last }));
}

function renderHero(data) {
  const profile = data.profile || {};

  $("[data-brand]").textContent = profile.brand || "rustila.dev";
  $("[data-status]").textContent = profile.status || "available for OJT";
  $("[data-headline]").textContent = profile.headline || "";
  $("[data-summary]").textContent = profile.summary || "";
  renderName(profile.name || "Janlyn B. Rustila");

  const roleLine = $("[data-role-line]");
  if (roleLine) {
    roleLine.textContent = [profile.role, profile.school, profile.location].filter(Boolean).join(" | ");
  }

  const quickContact = $("[data-quick-contact]");
  clear(quickContact);
  [
    { label: "Email", value: profile.email, href: profile.email ? `mailto:${profile.email}` : "" },
    { label: "Phone", value: profile.phone, href: profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : "" },
    { label: "Location", value: profile.location, href: "" }
  ].filter(item => item.value).forEach(item => {
    const value = item.href
      ? create("a", { text: item.value, attrs: { href: item.href } })
      : create("strong", { text: item.value });
    quickContact.append(create("div", {}, [
      create("span", { text: item.label }),
      value
    ]));
  });

  const focus = $("[data-focus]");
  clear(focus);
  (profile.focus || []).forEach((item, index) => {
    focus.append(create("article", { className: "focus-card" }, [
      create("small", { text: `Focus ${String(index + 1).padStart(2, "0")}` }),
      create("strong", { text: item })
    ]));
  });

  const snapshot = $("[data-snapshot]");
  clear(snapshot);
  (profile.snapshot || []).forEach(item => {
    snapshot.append(create("article", {}, [
      create("strong", { text: item.label || "" }),
      create("span", { text: item.value || "" })
    ]));
  });

  const stats = $("[data-stats]");
  clear(stats);
  (data.stats || []).forEach(stat => {
    stats.append(create("article", { className: "stat-card" }, [
      create("strong", { text: stat.value }),
      create("span", { text: stat.label })
    ]));
  });

  const email = profile.email ? `mailto:${profile.email}` : "#";
  const phone = profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : "#";
  $("[data-email-link]").setAttribute("href", email);
  $("[data-email-link]").textContent = profile.email || "";
  $("[data-phone-link]").setAttribute("href", phone);
  $("[data-phone-link]").textContent = profile.phone || "";
  $("[data-contact-location]").textContent = profile.location || "";
  $("[data-contact]").textContent = profile.contactPitch || `Based in ${profile.location || "Laguna, Philippines"}. Interested in embedded systems, software engineering, AI, IoT, networking, and technical operations roles.`;
  $("[data-footer-name]").textContent = `${profile.name || "Janlyn B. Rustila"} | ${profile.role || "Computer Engineering"} | ${profile.school || "LPU Laguna"}`;
  $("[data-footer-email]").textContent = profile.email || "";
  $("[data-footer-contact]").textContent = `${profile.location || ""} | ${profile.phone || ""}`;
}

function renderValueProps(items = []) {
  const root = $("[data-value-props]");
  clear(root);
  items.forEach((item, index) => {
    root.append(create("article", { className: "value-card" }, [
      create("small", { text: `REASON ${String(index + 1).padStart(2, "0")}` }),
      create("h3", { text: item.title || "" }),
      create("p", { text: item.description || "" })
    ]));
  });
}

function renderExperience(items = []) {
  const root = $("[data-experience]");
  clear(root);
  items.forEach(item => {
    const isCurrent = (item.period || "").toLowerCase().includes("present");
    const children = [
      create("p", { className: "meta", text: `${item.company || ""} | ${item.period || ""}` }),
      create("h3", { text: item.role || "" }),
      create("p", { text: item.description || "" }),
      renderTags(item.tags)
    ];
    if (isCurrent) children.unshift(create("span", { className: "current-role", text: "CURRENT EXPERIENCE" }));
    root.append(create("article", { className: `card ${isCurrent ? "current-experience" : ""}` }, children));
  });
}

function renderProjects(items = []) {
  const root = $("[data-projects]");
  clear(root);
  items.forEach(item => {
    const children = [
      create("p", { className: "meta", text: item.type || "" }),
      create("h3", { text: item.title || "" }),
      create("p", { text: item.description || "" })
    ];

    if (Array.isArray(item.impact) && item.impact.length) {
      children.push(create("ul", { className: "impact-list" }, item.impact.map(point => create("li", { text: point }))));
    }

    children.push(
      renderTags(item.tags)
    );

    root.append(create("article", { className: `project-card ${item.featured ? "featured" : ""}` }, children));
  });
}

function renderSkills(groups = []) {
  const root = $("[data-skills]");
  clear(root);
  groups.forEach(group => {
    root.append(create("article", { className: "skill-card" }, [
      create("h3", { text: group.title || "" }),
      create("ul", {}, (group.items || []).map(skill => create("li", { text: skill })))
    ]));
  });
}

function getCertificateDomain(cert) {
  const text = ` ${cert.issuer || ""} ${cert.name || ""} `.toLowerCase();
  return CERTIFICATE_DOMAINS.find(domain =>
    domain.keywords.some(keyword => text.includes(keyword))
  ) || CERTIFICATE_DOMAINS[CERTIFICATE_DOMAINS.length - 1];
}

function getCertificateInsight(cert) {
  const domain = getCertificateDomain(cert);
  const insights = {
    cybersecurity: "Supports practical readiness for security monitoring, investigation, response, and risk-aware operations.",
    networking: "Strengthens the networking foundation used in service monitoring, troubleshooting, and telecom operations.",
    "systems-cloud": "Builds working knowledge of the infrastructure and platforms behind reliable IT services.",
    "data-software": "Develops the programming, data, and automation skills used to analyze and improve technical workflows.",
    ai: "Expands my ability to apply AI and emerging tools responsibly to engineering and operational problems.",
    professional: "Strengthens the communication, planning, and delivery habits required in cross-functional technical teams.",
    engineering: "Adds another layer to my broad engineering foundation and continuous-learning discipline."
  };
  return insights[domain.id] || insights.engineering;
}

function renderCredentialDomains(items = []) {
  const root = $("[data-credential-domains]");
  if (!root) return;

  clear(root);
  CERTIFICATE_DOMAINS.forEach(domain => {
    const certificates = items.filter(cert => getCertificateDomain(cert).id === domain.id);
    if (!certificates.length) return;

    const examples = certificates.slice(0, 3).map(cert => cert.name).join(" | ");
    const card = create("button", {
      className: `credential-domain ${state.certificateDomain === domain.id ? "active" : ""}`,
      attrs: { type: "button", "data-domain": domain.id }
    }, [
      create("span", { className: "domain-count", text: String(certificates.length).padStart(2, "0") }),
      create("span", { className: "domain-copy" }, [
        create("strong", { text: domain.title }),
        create("span", { text: domain.description }),
        create("small", { text: examples })
      ])
    ]);

    card.addEventListener("click", () => {
      state.certificateDomain = state.certificateDomain === domain.id ? "" : domain.id;
      state.showAllCertificates = Boolean(state.certificateDomain);
      renderCredentialDomains(items);
      renderCertifications(items);
      $("[data-certifications]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    root.append(card);
  });
}

function renderCertifications(items = []) {
  const root = $("[data-certifications]");
  const summary = $("[data-cert-summary]");
  const context = $("[data-cert-context]");
  const showAll = $("[data-cert-show-all]");
  const clearFocus = $("[data-cert-clear]");
  const actions = showAll?.parentElement;
  const query = state.certificateQuery.trim().toLowerCase();
  const filtered = items.filter(cert => {
    const matchesQuery = !query || `${cert.issuer || ""} ${cert.name || ""} ${cert.displayDate || cert.issueDate || ""}`.toLowerCase().includes(query);
    const matchesDomain = !state.certificateDomain || getCertificateDomain(cert).id === state.certificateDomain;
    return matchesQuery && matchesDomain;
  });
  const visible = state.showAllCertificates || query ? filtered : filtered.slice(0, 12);

  clear(root);
  if (!visible.length) {
    root.append(create("p", {
      className: "cert-empty",
      text: "No certificates match this focus yet."
    }));
  }
  visible.forEach(cert => {
    const hasFile = Boolean(cert.credentialUrl || cert.pdfUrl);
    const card = create("button", {
      className: "cert-card",
      attrs: { type: "button", "data-cert-id": cert.id || "" }
    }, [
      create("span", { className: "cert-logo", text: cert.issuer || "ORG" }),
      create("span", {}, [
        create("h3", { text: cert.name || "" }),
        create("p", { text: cert.displayDate || cert.issueDate || "" }),
        create("p", { className: "cert-insight", text: getCertificateInsight(cert) }),
        create("p", { className: "cert-file", text: hasFile ? "View PDF" : "Credential listed" })
      ])
    ]);
    card.addEventListener("click", () => openCertificate(cert));
    root.append(card);
  });

  if (summary) {
    summary.textContent = query || state.certificateDomain
      ? `${filtered.length} matching certificate${filtered.length === 1 ? "" : "s"}`
      : `${items.length} certificates and credentials`;
  }

  if (context) {
    const domain = CERTIFICATE_DOMAINS.find(item => item.id === state.certificateDomain);
    context.textContent = domain
      ? `${domain.title}: ${domain.description}`
      : "Verified learning evidence across my technical focus areas.";
  }

  if (clearFocus) {
    clearFocus.hidden = !state.certificateDomain && !query;
  }

  if (showAll && actions) {
    const hasMore = !query && !state.certificateDomain && items.length > 12;
    actions.hidden = !hasMore;
    showAll.textContent = state.showAllCertificates ? "Show featured certificates" : `Show all ${items.length} certificates`;
  }
}

function renderLeadership(items = []) {
  const root = $("[data-leadership]");
  clear(root);
  items.forEach(item => {
    root.append(create("article", { className: "lead-card" }, [
      create("p", { className: "meta", text: item.organization || "" }),
      create("h3", { text: item.role || "" }),
      create("p", { className: "meta", text: item.period || "" }),
      create("p", { text: item.description || "" }),
      renderTags(item.tags)
    ]));
  });
}

function renderAppsScript(data) {
  const appsScript = data.integrations?.appsScript || {};
  const idEl = $("[data-appscript-id]");
  const linkEl = $("[data-open-appscript]");
  const statusEl = $("[data-appscript-status]");

  if (!idEl || !linkEl || !statusEl) return;

  idEl.textContent = appsScript.scriptId || appsScript.deploymentId || "No Apps Script ID configured.";
  linkEl.href = appsScript.editUrl || appsScript.candidateWebAppUrl || "#";
  linkEl.style.pointerEvents = linkEl.href.endsWith("#") ? "none" : "";
  statusEl.textContent = appsScript.syncReady
    ? "Sync is ready because a deployed web app URL or deployment ID is configured."
    : "Script ID added. For Vercel, add APPS_SCRIPT_WEBAPP_URL or APPS_SCRIPT_DEPLOYMENT_ID in project environment variables to enable sync.";
}

function renderPortfolio(data) {
  state.portfolio = data;
  renderHero(data);
  renderValueProps(data.profile?.valueProps || []);
  renderExperience(data.experience);
  renderProjects(data.projects);
  renderSkills(data.skills);
  renderCredentialDomains(data.certifications);
  renderCertifications(data.certifications);
  renderLeadership(data.leadership);
  renderAppsScript(data);
}

function openCertificate(cert) {
  const modal = $("[data-cert-modal]");
  const title = $("[data-modal-title]");
  const body = $("[data-modal-body]");
  const url = cert.credentialUrl || cert.pdfUrl || "";

  title.textContent = cert.name || "Certificate";
  clear(body);

  if (!url) {
    body.append(create("div", {
      className: "modal-empty",
      text: "No certificate file or credential URL has been added yet."
    }));
  } else if (/\.pdf($|\?)/i.test(url) || url.startsWith("data:application/pdf")) {
    body.append(create("iframe", {
      className: "modal-frame",
      attrs: { src: url, title: cert.name || "Certificate PDF" }
    }));
  } else {
    body.append(create("div", { className: "modal-empty" }, [
      create("p", { text: "Credential link:" }),
      create("a", { className: "button primary", text: "Open certificate", attrs: { href: url, target: "_blank", rel: "noreferrer" } })
    ]));
  }

  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "open");
}

async function loadPortfolio() {
  if (window.location.protocol === "file:") {
    return normalizeClientPortfolio(FALLBACK_PORTFOLIO);
  }

  try {
    const response = await fetch("/api/portfolio", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`API request failed with ${response.status}`);
    return response.json();
  } catch (error) {
    console.warn("Using built-in portfolio fallback:", error);
    return normalizeClientPortfolio(FALLBACK_PORTFOLIO);
  }
}

function showFatalError(error) {
  const hero = $(".hero-copy");
  hero.append(create("div", {
    className: "error-state",
    text: `Portfolio API error: ${error.message}`
  }));
}

function clientOrder(a, b) {
  return Number(a.order || 999) - Number(b.order || 999);
}

function clientIssueDateScore(value) {
  const match = String(value || "").match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return 0;
  return Number(match[1]) * 100 + Number(match[2] || 1);
}

function clientDisplayIssueDate(value) {
  const match = String(value || "").match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return value || "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = Math.max(0, Math.min(11, Number(match[2] || 1) - 1));
  return `${months[monthIndex]} ${match[1]}`;
}

function normalizeClientPortfolio(data) {
  const copy = JSON.parse(JSON.stringify(data));
  const appsScript = copy.integrations?.appsScript || {};
  const scriptId = appsScript.scriptId || "";
  const deploymentId = appsScript.deploymentId || "";
  const webAppUrl = appsScript.webAppUrl || "";
  const webAppId = deploymentId || scriptId;

  copy.integrations = {
    ...(copy.integrations || {}),
    appsScript: {
      ...appsScript,
      scriptId,
      deploymentId,
      webAppUrl,
      editUrl: scriptId ? `https://script.google.com/d/${encodeURIComponent(scriptId)}/edit` : "",
      candidateWebAppUrl: webAppId ? `https://script.google.com/macros/s/${encodeURIComponent(webAppId)}/exec` : "",
      syncReady: Boolean(webAppUrl || deploymentId)
    }
  };

  copy.stats = [...(copy.stats || [])].sort(clientOrder);
  copy.experience = [...(copy.experience || [])].sort(clientOrder);
  copy.skills = [...(copy.skills || [])].sort(clientOrder);
  copy.leadership = [...(copy.leadership || [])].sort(clientOrder);
  copy.projects = [...(copy.projects || [])].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    return clientOrder(a, b) || String(a.title || "").localeCompare(String(b.title || ""));
  });
  copy.certifications = [...(copy.certifications || [])]
    .map(cert => ({ ...cert, displayDate: clientDisplayIssueDate(cert.issueDate) }))
    .sort((a, b) => clientIssueDateScore(b.issueDate) - clientIssueDateScore(a.issueDate) || clientOrder(a, b));

  return copy;
}

async function addCertificate() {
  const token = $("[data-admin-token]").value.trim();
  const issuer = $("[data-cert-issuer]").value.trim();
  const name = $("[data-cert-name]").value.trim();
  const issueDate = $("[data-cert-date]").value.trim();
  const credentialUrl = $("[data-cert-url]").value.trim();
  const message = $("[data-admin-message]");

  message.textContent = "Saving...";

  try {
    const response = await fetch("/api/certifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token
      },
      body: JSON.stringify({ issuer, name, issueDate, credentialUrl })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || payload.error || "Unable to add certificate.");

    $("[data-cert-issuer]").value = "";
    $("[data-cert-name]").value = "";
    $("[data-cert-date]").value = "";
    $("[data-cert-url]").value = "";
    message.textContent = "Certificate added and sorted.";
    renderPortfolio(payload.portfolio);
  } catch (error) {
    message.textContent = error.message;
  }
}

async function syncAppsScriptCertificates() {
  const token = $("[data-admin-token]").value.trim();
  const adminMessage = $("[data-admin-message]");
  const scriptStatus = $("[data-appscript-status]");

  adminMessage.textContent = "Syncing from Apps Script...";
  scriptStatus.textContent = "Requesting Apps Script data...";

  try {
    const response = await fetch("/api/appscript/sync-certifications", {
      method: "POST",
      headers: { "x-admin-token": token }
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || payload.error || "Unable to sync Apps Script.");

    adminMessage.textContent = payload.message;
    scriptStatus.textContent = "Sync complete. Certificates were imported and sorted.";
    renderPortfolio(payload.portfolio);
  } catch (error) {
    adminMessage.textContent = error.message;
    scriptStatus.textContent = "Sync needs a deployed Apps Script web app URL or deployment ID.";
  }
}

function initAdmin() {
  const panel = $("[data-admin-panel]");
  const toggle = $("[data-admin-toggle]");
  const adminEnabled = new URLSearchParams(window.location.search).has("admin");

  if (!adminEnabled) return;

  toggle.classList.add("visible");
  toggle.addEventListener("click", () => panel.classList.toggle("open"));
  $("[data-close-admin]").addEventListener("click", () => panel.classList.remove("open"));
  $("[data-add-cert]").addEventListener("click", addCertificate);
  $("[data-sync-appscript]").addEventListener("click", syncAppsScriptCertificates);
}

function initModal() {
  $("[data-close-modal]").addEventListener("click", () => {
    const modal = $("[data-cert-modal]");
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  });
}

function initCertificateControls() {
  const search = $("[data-cert-search]");
  const showAll = $("[data-cert-show-all]");
  const clearFocus = $("[data-cert-clear]");

  search.addEventListener("input", event => {
    state.certificateQuery = event.target.value;
    renderCertifications(state.portfolio?.certifications || []);
  });

  showAll.addEventListener("click", () => {
    state.showAllCertificates = !state.showAllCertificates;
    renderCertifications(state.portfolio?.certifications || []);
  });

  clearFocus.addEventListener("click", () => {
    state.certificateQuery = "";
    state.certificateDomain = "";
    state.showAllCertificates = false;
    search.value = "";
    renderCredentialDomains(state.portfolio?.certifications || []);
    renderCertifications(state.portfolio?.certifications || []);
  });
}

function initGalaxy() {
  if (state.galaxyFrame) cancelAnimationFrame(state.galaxyFrame);
  if (state.galaxyCleanup) state.galaxyCleanup();

  const canvas = $("#galaxyCanvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const stars = [];
  const mouse = { x: .5, y: .5, active: false };
  const opts = {
    density: 1,
    glowIntensity: .3,
    saturation: 0,
    hueShift: 140,
    twinkleIntensity: .3,
    rotationSpeed: .1,
    repulsionStrength: 2,
    starSpeed: .5,
    speed: 1
  };

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars.length = 0;

    const count = Math.max(130, Math.min(360, Math.floor((w * h / 7200) * opts.density)));
    for (let i = 0; i < count; i += 1) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.pow(Math.random(), .72) * Math.max(w, h) * .62,
        size: .45 + Math.random() * 1.65,
        depth: .25 + Math.random() * .9,
        phase: Math.random() * Math.PI * 2,
        drift: .25 + Math.random() * .75
      });
    }
  }

  function starColor(alpha) {
    if (opts.saturation === 0) return `rgba(244,247,248,${alpha})`;
    const hue = (170 + opts.hueShift) % 360;
    return `hsla(${hue},65%,78%,${alpha})`;
  }

  function draw(now) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w * .54;
    const cy = h * .44;
    const t = now * .001 * opts.speed;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    stars.forEach(star => {
      const rot = reduceMotion ? 0 : t * opts.rotationSpeed * star.drift;
      let x = cx + Math.cos(star.angle + rot) * star.radius * star.depth;
      let y = cy + Math.sin(star.angle + rot) * star.radius * star.depth * .58;
      y += Math.sin(t * opts.starSpeed + star.phase) * 8 * star.depth;

      if (mouse.active) {
        const dx = x - mouse.x * w;
        const dy = y - mouse.y * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170) {
          const force = (1 - dist / 170) * opts.repulsionStrength * 14;
          x += (dx / (dist || 1)) * force;
          y += (dy / (dist || 1)) * force;
        }
      }

      const twinkle = reduceMotion ? 1 : 1 + (Math.sin(t * 2 + star.phase) * .5 + .5) * opts.twinkleIntensity;
      const alpha = Math.min(.88, (.18 + star.depth * .58) * twinkle);
      const r = star.size * (.7 + star.depth) * twinkle;

      ctx.beginPath();
      ctx.fillStyle = starColor(alpha);
      ctx.shadowBlur = 18 * opts.glowIntensity * star.depth;
      ctx.shadowColor = "rgba(183,243,74,.58)";
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    if (!reduceMotion) state.galaxyFrame = requestAnimationFrame(draw);
  }

  function onMove(event) {
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;
    mouse.active = true;
  }

  function onLeave() {
    mouse.active = false;
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseleave", onLeave);
  state.galaxyCleanup = () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseleave", onLeave);
  };
  draw(0);
}

document.addEventListener("DOMContentLoaded", async () => {
  initGalaxy();
  initAdmin();
  initModal();
  initCertificateControls();

  try {
    renderPortfolio(await loadPortfolio());
  } catch (error) {
    showFatalError(error);
  }
});
