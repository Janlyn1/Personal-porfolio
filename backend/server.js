"use strict";

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";
const ROOT_DIR = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT_DIR, "frontend");
const DATA_FILE = path.join(__dirname, "data", "portfolio.json");
const MAX_BODY_BYTES = 20 * 1024 * 1024;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf"
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendText(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function isAdmin(req) {
  const headerToken = req.headers["x-admin-token"];
  const auth = req.headers.authorization || "";
  return headerToken === ADMIN_TOKEN || auth === `Bearer ${ADMIN_TOKEN}`;
}

function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  sendJson(res, 401, {
    error: "Unauthorized",
    message: "Send the admin token using x-admin-token or Authorization: Bearer <token>."
  });
  return false;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function readJsonBody(req) {
  const raw = await readBody(req);
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    error.statusCode = 400;
    error.publicMessage = "Invalid JSON body.";
    throw error;
  }
}

async function loadPortfolio() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function savePortfolio(data) {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function byOrder(a, b) {
  return Number(a.order || 999) - Number(b.order || 999);
}

function issueDateScore(value) {
  const match = String(value || "").match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return 0;
  return Number(match[1]) * 100 + Number(match[2] || 1);
}

function displayIssueDate(value) {
  const match = String(value || "").match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return value || "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = match[1];
  const monthIndex = Math.max(0, Math.min(11, Number(match[2] || 1) - 1));
  return `${months[monthIndex]} ${year}`;
}

function slugify(value) {
  const clean = String(value || "item")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean || `item-${Date.now()}`;
}

function normalizeIssueDate(value) {
  const raw = String(value || "").trim();
  if (/^\d{4}(-\d{2})?$/.test(raw)) return raw;

  const months = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12"
  };

  const monthYear = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = months[monthYear[1].toLowerCase()];
    if (month) return `${monthYear[2]}-${month}`;
  }

  const yearOnly = raw.match(/\b(20\d{2}|19\d{2})\b/);
  return yearOnly ? yearOnly[1] : "";
}

function getAppsScriptConfig(data) {
  const appsScript = data.integrations?.appsScript || {};
  const scriptId = String(appsScript.scriptId || "").trim();
  const deploymentId = String(appsScript.deploymentId || "").trim();
  const webAppUrl = String(appsScript.webAppUrl || "").trim();
  const webAppId = deploymentId || scriptId;

  return {
    ...appsScript,
    scriptId,
    deploymentId,
    webAppUrl,
    editUrl: scriptId ? `https://script.google.com/d/${encodeURIComponent(scriptId)}/edit` : "",
    candidateWebAppUrl: webAppId ? `https://script.google.com/macros/s/${encodeURIComponent(webAppId)}/exec` : "",
    syncReady: Boolean(webAppUrl || deploymentId)
  };
}

function getField(input, names) {
  for (const name of names) {
    if (input[name] !== undefined && input[name] !== null && String(input[name]).trim() !== "") {
      return input[name];
    }
  }
  return "";
}

function certificateFromAppsScript(input, order) {
  const issuer = String(getField(input, ["issuer", "org", "organization", "provider", "certLogo"])).trim();
  const name = String(getField(input, ["name", "title", "certificate", "certification", "certificationName"])).trim();
  const issueDate = normalizeIssueDate(getField(input, ["issueDate", "date", "certDate", "monthYear", "issued"]));
  const credentialUrl = String(getField(input, ["credentialUrl", "pdfUrl", "url", "link", "fileUrl"])).trim();

  return validateCertificate({
    id: getField(input, ["id", "slug"]),
    issuer,
    name,
    issueDate,
    credentialUrl,
    order
  });
}

function mergeCertifications(existing, incoming) {
  const byKey = new Map();
  for (const cert of existing || []) {
    byKey.set(`${slugify(cert.issuer)}:${slugify(cert.name)}:${cert.issueDate}`, cert);
  }
  for (const cert of incoming) {
    byKey.set(`${slugify(cert.issuer)}:${slugify(cert.name)}:${cert.issueDate}`, cert);
  }
  return [...byKey.values()];
}

function normalizePortfolio(data) {
  const copy = structuredClone(data);

  copy.integrations = {
    ...(copy.integrations || {}),
    appsScript: getAppsScriptConfig(copy)
  };

  copy.stats = [...(copy.stats || [])].sort(byOrder);
  copy.experience = [...(copy.experience || [])].sort(byOrder);
  copy.skills = [...(copy.skills || [])].sort(byOrder);
  copy.leadership = [...(copy.leadership || [])].sort(byOrder);

  copy.projects = [...(copy.projects || [])].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    return byOrder(a, b) || String(a.title || "").localeCompare(String(b.title || ""));
  });

  copy.certifications = [...(copy.certifications || [])]
    .map(cert => ({
      ...cert,
      displayDate: displayIssueDate(cert.issueDate)
    }))
    .sort((a, b) => {
      return issueDateScore(b.issueDate) - issueDateScore(a.issueDate)
        || byOrder(a, b)
        || String(a.name || "").localeCompare(String(b.name || ""));
    });

  return copy;
}

function validateCertificate(input) {
  const issuer = String(input.issuer || "").trim();
  const name = String(input.name || "").trim();
  const issueDate = String(input.issueDate || "").trim();
  const credentialUrl = String(input.credentialUrl || input.pdfUrl || "").trim();

  if (!issuer) throw Object.assign(new Error("Issuer is required."), { statusCode: 400 });
  if (!name) throw Object.assign(new Error("Certificate name is required."), { statusCode: 400 });
  if (!/^\d{4}(-\d{2})?$/.test(issueDate)) {
    throw Object.assign(new Error("issueDate must be YYYY or YYYY-MM."), { statusCode: 400 });
  }

  return {
    id: input.id ? slugify(input.id) : `${slugify(issuer)}-${slugify(name)}-${crypto.randomBytes(3).toString("hex")}`,
    issuer,
    name,
    issueDate,
    credentialUrl,
    order: Number(input.order || 999)
  };
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "janlyn-portfolio-api" });
    return;
  }

  if (req.method === "GET" && pathname === "/api/portfolio") {
    const portfolio = await loadPortfolio();
    sendJson(res, 200, normalizePortfolio(portfolio));
    return;
  }

  if (req.method === "GET" && pathname === "/api/appscript") {
    const portfolio = await loadPortfolio();
    sendJson(res, 200, getAppsScriptConfig(portfolio));
    return;
  }

  if (req.method === "PUT" && pathname === "/api/portfolio") {
    if (!requireAdmin(req, res)) return;
    const nextPortfolio = await readJsonBody(req);
    await savePortfolio(nextPortfolio);
    sendJson(res, 200, normalizePortfolio(nextPortfolio));
    return;
  }

  if (req.method === "POST" && pathname === "/api/certifications") {
    if (!requireAdmin(req, res)) return;
    const portfolio = await loadPortfolio();
    const certificate = validateCertificate(await readJsonBody(req));
    portfolio.certifications = [...(portfolio.certifications || []), certificate];
    await savePortfolio(portfolio);
    sendJson(res, 201, {
      message: "Certificate added.",
      certificate,
      portfolio: normalizePortfolio(portfolio)
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/appscript/sync-certifications") {
    if (!requireAdmin(req, res)) return;
    const portfolio = await loadPortfolio();
    const appsScript = getAppsScriptConfig(portfolio);
    const syncUrl = appsScript.webAppUrl || (appsScript.deploymentId ? appsScript.candidateWebAppUrl : "");

    if (!syncUrl) {
      sendJson(res, 400, {
        error: "Apps Script web app URL missing",
        message: "Add a deployed Apps Script webAppUrl or deploymentId in backend/data/portfolio.json before syncing.",
        appsScript
      });
      return;
    }

    const response = await fetch(syncUrl, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      sendJson(res, 502, {
        error: "Apps Script request failed",
        message: `Apps Script returned HTTP ${response.status}.`,
        url: syncUrl
      });
      return;
    }

    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload.certifications || payload.data || payload.rows || [];
    if (!Array.isArray(rows)) {
      sendJson(res, 400, {
        error: "Unexpected Apps Script response",
        message: "Expected an array, or an object with certifications/data/rows array."
      });
      return;
    }

    const imported = rows.map((row, index) => certificateFromAppsScript(row, index + 1));
    portfolio.certifications = mergeCertifications(portfolio.certifications, imported);
    await savePortfolio(portfolio);
    sendJson(res, 200, {
      message: `Imported ${imported.length} certificate(s) from Apps Script.`,
      importedCount: imported.length,
      portfolio: normalizePortfolio(portfolio)
    });
    return;
  }

  const deleteMatch = pathname.match(/^\/api\/certifications\/([^/]+)$/);
  if (req.method === "DELETE" && deleteMatch) {
    if (!requireAdmin(req, res)) return;
    const portfolio = await loadPortfolio();
    const id = decodeURIComponent(deleteMatch[1]);
    const before = (portfolio.certifications || []).length;
    portfolio.certifications = (portfolio.certifications || []).filter(cert => cert.id !== id);
    if (portfolio.certifications.length === before) {
      sendJson(res, 404, { error: "Not found", message: "Certificate id was not found." });
      return;
    }
    await savePortfolio(portfolio);
    sendJson(res, 200, {
      message: "Certificate deleted.",
      portfolio: normalizePortfolio(portfolio)
    });
    return;
  }

  sendJson(res, 404, { error: "Not found", message: "API route does not exist." });
}

async function serveStatic(req, res, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const filePath = path.resolve(FRONTEND_DIR, `.${decodedPath}`);

  if (!filePath.startsWith(FRONTEND_DIR)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": [".html", ".css", ".js"].includes(ext) ? "no-store" : "public, max-age=600"
    });
    res.end(body);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendText(res, 404, "Not found");
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = url.pathname;

    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,x-admin-token"
      });
      res.end();
      return;
    }

    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }

    await serveStatic(req, res, pathname);
  } catch (error) {
    const status = error.statusCode || 500;
    sendJson(res, status, {
      error: status >= 500 ? "Server error" : "Request error",
      message: error.publicMessage || error.message
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Portfolio app running at http://127.0.0.1:${PORT}`);
  console.log(`Same Wi-Fi devices can use http://YOUR-LAPTOP-IP:${PORT}`);
  console.log(`Admin token: ${ADMIN_TOKEN}`);
});
