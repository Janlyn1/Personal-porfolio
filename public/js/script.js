"use strict";

const state = {
  portfolio: null,
  galaxyFrame: null,
  galaxyCleanup: null
};

const FALLBACK_PORTFOLIO = {
  "profile": {
    "name": "Janlyn B. Rustila",
    "brand": "rustila.dev",
    "role": "Computer Engineering OJT Candidate",
    "headline": "Embedded Systems | AI + Robotics | IoT",
    "summary": "Computer Engineering student who builds working prototypes across embedded systems, robotics, AI, networking, and automation. I am looking for an OJT role where I can help turn technical requirements into tested, documented, real-world solutions while learning from an engineering team.",
    "status": "open for OJT / internship",
    "location": "San Juan, Alaminos, Laguna, Philippines",
    "phone": "+63 976 353 2039",
    "email": "Rustilajanlyn@gmail.com",
    "school": "Lyceum of the Philippines University - Laguna",
    "focus": [
      "Embedded + IoT prototyping",
      "Python automation + AI workflows",
      "Documentation + reliable delivery"
    ],
    "valueProps": [
      {
        "title": "Hands-on prototype builder",
        "description": "Comfortable turning ideas into working systems using sensors, Raspberry Pi, microcontrollers, and real-time control logic."
      },
      {
        "title": "Software-minded engineer",
        "description": "Uses Python, C++, Java, SQL, and web fundamentals to connect hardware outputs to useful workflows, data, and interfaces."
      },
      {
        "title": "Organized OJT teammate",
        "description": "Brings leadership experience, careful documentation, and a learning mindset suited for engineering teams and technical operations."
      }
    ],
    "snapshot": [
      {
        "label": "Best fit",
        "value": "Embedded systems, IoT, robotics, AI tools, networking, or technical support roles."
      },
      {
        "label": "Can contribute",
        "value": "Prototype testing, automation scripts, sensor workflows, data cleanup, technical documentation, and troubleshooting."
      },
      {
        "label": "Work style",
        "value": "Curious, detail-oriented, dependable, and willing to iterate until the system works."
      }
    ],
    "contactPitch": "Available for OJT, internship, and entry-level project collaboration in embedded systems, software, AI, IoT, networking, and technical operations.",
    "socials": [
      {
        "label": "View LinkedIn",
        "url": "https://www.linkedin.com/in/janlyn-rustila-04abb9206/",
        "primary": true
      },
      {
        "label": "Email for Interview",
        "url": "mailto:Rustilajanlyn@gmail.com",
        "primary": false
      }
    ]
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
      "value": "6",
      "label": "engineering projects",
      "note": "Embedded, robotics, AI, security, and automation prototypes.",
      "order": 1
    },
    {
      "value": "8",
      "label": "certifications listed",
      "note": "Cisco, IBM, safety, analytics, networking, and cybersecurity training.",
      "order": 2
    },
    {
      "value": "3",
      "label": "technical domains",
      "note": "Hardware integration, software automation, and network-aware systems.",
      "order": 3
    },
    {
      "value": "OJT",
      "label": "interview ready",
      "note": "Prepared to contribute, document, test, and learn with a technical team.",
      "order": 4
    }
  ],
  "experience": [
    {
      "role": "YouTube Editor",
      "company": "Remote Work",
      "period": "Jan 2021 - July 2021",
      "description": "Produced edited video content for remote clients while managing files, deadlines, revisions, publishing schedules, and quality checks. This experience strengthened my discipline in communication, organized workflows, and delivering output with minimal supervision.",
      "tags": [
        "remote work",
        "deadline management",
        "content production",
        "quality checks",
        "client communication"
      ],
      "order": 1
    }
  ],
  "projects": [
    {
      "title": "CampusVital: Smart Health Monitoring Kiosk",
      "type": "thesis project | embedded systems | IoT",
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
      "featured": true,
      "order": 1
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
      "order": 2
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
      "order": 3
    },
    {
      "title": "AI Skin Disease Scanner",
      "type": "AI | machine learning | Raspberry Pi",
      "description": "Built a proof-of-concept AI scanner for psoriasis and eczema support using Raspberry Pi, image processing, and a trained machine learning workflow.",
      "impact": [
        "Combined image capture, model inference, and user feedback in one prototype flow.",
        "Shows ability to connect AI concepts with practical embedded deployment."
      ],
      "tags": [
        "Raspberry Pi",
        "Python",
        "ML Model",
        "AI"
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
      "title": "Embedded & IoT",
      "items": [
        "Embedded Systems",
        "Raspberry Pi",
        "Microcontrollers",
        "Sensors",
        "Hardware-Software Integration",
        "Robotics"
      ],
      "order": 1
    },
    {
      "title": "Software & Data",
      "items": [
        "Python",
        "C++",
        "Java",
        "SQL",
        "Visual Basic",
        "HTML/CSS",
        "Automation Scripts"
      ],
      "order": 2
    },
    {
      "title": "AI, Network & Security",
      "items": [
        "Machine Learning",
        "Image Processing",
        "Cisco Networking",
        "Data Analytics",
        "Cybersecurity Fundamentals",
        "Technical Troubleshooting"
      ],
      "order": 3
    },
    {
      "title": "Professional Workflow",
      "items": [
        "Documentation",
        "Testing",
        "Project Coordination",
        "Remote Collaboration",
        "Budget Tracking",
        "Quality Checks"
      ],
      "order": 4
    }
  ],
  "certifications": [
    {
      "id": "ibm-intro-cybersecurity",
      "issuer": "IBM",
      "name": "Introduction to Cybersecurity",
      "issueDate": "2025-12",
      "credentialUrl": "",
      "order": 1
    },
    {
      "id": "ibm-machine-learning-python",
      "issuer": "IBM",
      "name": "Machine Learning with Python",
      "issueDate": "2025-12",
      "credentialUrl": "",
      "order": 2
    },
    {
      "id": "cisco-ccna-srwe",
      "issuer": "CISCO",
      "name": "CCNA: Switching, Routing & Wireless Essentials",
      "issueDate": "2025-10",
      "credentialUrl": "",
      "order": 3
    },
    {
      "id": "cisco-networking-devices",
      "issuer": "CISCO",
      "name": "Networking Devices and Initial Configuration",
      "issueDate": "2025-05",
      "credentialUrl": "",
      "order": 4
    },
    {
      "id": "cisco-data-analytics",
      "issuer": "CISCO",
      "name": "Data Analytics Essentials",
      "issueDate": "2025-04",
      "credentialUrl": "",
      "order": 5
    },
    {
      "id": "cisco-network-basics",
      "issuer": "CISCO",
      "name": "Network Basics",
      "issueDate": "2025-04",
      "credentialUrl": "",
      "order": 6
    },
    {
      "id": "cisco-pcap-python",
      "issuer": "CISCO",
      "name": "PCAP - Programming Essentials in Python",
      "issueDate": "2024-05",
      "credentialUrl": "",
      "order": 7
    },
    {
      "id": "itg-bosh-safety-officer",
      "issuer": "ITG",
      "name": "BOSH Training Course for Safety Officer",
      "issueDate": "2024-05",
      "credentialUrl": "",
      "order": 8
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

  const socials = $("[data-socials]");
  clear(socials);
  (profile.socials || []).forEach(social => {
    socials.append(create("a", {
      className: `button ${social.primary ? "primary" : ""}`,
      text: social.primary ? `${social.label} ->` : social.label,
      attrs: {
        href: social.url || "#",
        target: social.url && social.url.startsWith("http") ? "_blank" : null,
        rel: social.url && social.url.startsWith("http") ? "noreferrer" : null
      }
    }));
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
  $("[data-email-link]").setAttribute("href", email);
  $("[data-contact]").textContent = profile.contactPitch || `Based in ${profile.location || "Laguna, Philippines"}. Interested in embedded systems, software engineering, AI, IoT, networking, and technical operations roles.`;
  $("[data-footer-name]").textContent = `${profile.name || "Janlyn B. Rustila"} | ${profile.role || "Computer Engineering"} | ${profile.school || "LPU Laguna"}`;
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
    root.append(create("article", { className: "card" }, [
      create("p", { className: "meta", text: `${item.company || ""} | ${item.period || ""}` }),
      create("h3", { text: item.role || "" }),
      create("p", { text: item.description || "" }),
      renderTags(item.tags)
    ]));
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

function renderCertifications(items = []) {
  const root = $("[data-certifications]");
  clear(root);
  items.forEach(cert => {
    const card = create("button", {
      className: "cert-card",
      attrs: { type: "button", "data-cert-id": cert.id || "" }
    }, [
      create("span", { className: "cert-logo", text: cert.issuer || "ORG" }),
      create("span", {}, [
        create("h3", { text: cert.name || "" }),
        create("p", { text: cert.displayDate || cert.issueDate || "" })
      ])
    ]);
    card.addEventListener("click", () => openCertificate(cert));
    root.append(card);
  });
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

  try {
    renderPortfolio(await loadPortfolio());
  } catch (error) {
    showFatalError(error);
  }
});
