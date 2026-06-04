"use strict";

const state = {
  portfolio: null,
  galaxyFrame: null,
  galaxyCleanup: null
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
  $("[data-contact]").textContent = `Based in ${profile.location || "Laguna, Philippines"}. Interested in embedded systems, software engineering, AI, IoT, networking, and technical operations roles.`;
  $("[data-footer-name]").textContent = `${profile.name || "Janlyn B. Rustila"} | ${profile.role || "Computer Engineering"} | ${profile.school || "LPU Laguna"}`;
  $("[data-footer-contact]").textContent = `${profile.location || ""} | ${profile.phone || ""}`;
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
    root.append(create("article", { className: `project-card ${item.featured ? "featured" : ""}` }, [
      create("p", { className: "meta", text: item.type || "" }),
      create("h3", { text: item.title || "" }),
      create("p", { text: item.description || "" }),
      renderTags(item.tags)
    ]));
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
  const response = await fetch("/api/portfolio", { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`API request failed with ${response.status}`);
  return response.json();
}

function showFatalError(error) {
  const hero = $(".hero-copy");
  hero.append(create("div", {
    className: "error-state",
    text: `Portfolio API error: ${error.message}`
  }));
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
  $("[data-admin-toggle]").addEventListener("click", () => panel.classList.toggle("open"));
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
