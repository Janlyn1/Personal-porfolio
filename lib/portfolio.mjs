import { createRequire } from "node:module";
import crypto from "node:crypto";

const require = createRequire(import.meta.url);
const DEFAULT_PORTFOLIO = require("../api/data/portfolio.json");
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";

export function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export function methodNotAllowed(methods = ["GET"]) {
  return json({
    error: "Method not allowed",
    message: `Allowed methods: ${methods.join(", ")}`
  }, 405);
}

export function isAdmin(request) {
  const headerToken = request.headers.get("x-admin-token");
  const auth = request.headers.get("authorization") || "";
  return headerToken === ADMIN_TOKEN || auth === `Bearer ${ADMIN_TOKEN}`;
}

export function unauthorized() {
  return json({
    error: "Unauthorized",
    message: "Send the admin token using x-admin-token or Authorization: Bearer <token>."
  }, 401);
}

export function loadPortfolio() {
  return structuredClone(DEFAULT_PORTFOLIO);
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

export function slugify(value) {
  const clean = String(value || "item")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean || `item-${Date.now()}`;
}

export function normalizeIssueDate(value) {
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

export function getAppsScriptConfig(data) {
  const appsScript = data.integrations?.appsScript || {};
  const scriptId = String(process.env.APPS_SCRIPT_ID || appsScript.scriptId || "").trim();
  const deploymentId = String(process.env.APPS_SCRIPT_DEPLOYMENT_ID || appsScript.deploymentId || "").trim();
  const webAppUrl = String(process.env.APPS_SCRIPT_WEBAPP_URL || appsScript.webAppUrl || "").trim();
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

export function normalizePortfolio(data) {
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

function getField(input, names) {
  for (const name of names) {
    if (input[name] !== undefined && input[name] !== null && String(input[name]).trim() !== "") {
      return input[name];
    }
  }
  return "";
}

export function validateCertificate(input) {
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

export function certificateFromAppsScript(input, order) {
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

export function mergeCertifications(existing, incoming) {
  const byKey = new Map();
  for (const cert of existing || []) {
    byKey.set(`${slugify(cert.issuer)}:${slugify(cert.name)}:${cert.issueDate}`, cert);
  }
  for (const cert of incoming) {
    byKey.set(`${slugify(cert.issuer)}:${slugify(cert.name)}:${cert.issueDate}`, cert);
  }
  return [...byKey.values()];
}

export async function syncAppsScriptCertificates() {
  const portfolio = loadPortfolio();
  const appsScript = getAppsScriptConfig(portfolio);
  const syncUrl = appsScript.webAppUrl || (appsScript.deploymentId ? appsScript.candidateWebAppUrl : "");

  if (!syncUrl) {
    return {
      ok: false,
      status: 400,
      payload: {
        error: "Apps Script web app URL missing",
        message: "Add APPS_SCRIPT_WEBAPP_URL or APPS_SCRIPT_DEPLOYMENT_ID in Vercel environment variables before syncing.",
        appsScript
      }
    };
  }

  const response = await fetch(syncUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    return {
      ok: false,
      status: 502,
      payload: {
        error: "Apps Script request failed",
        message: `Apps Script returned HTTP ${response.status}.`,
        url: syncUrl
      }
    };
  }

  const payload = await response.json();
  const rows = Array.isArray(payload) ? payload : payload.certifications || payload.data || payload.rows || [];
  if (!Array.isArray(rows)) {
    return {
      ok: false,
      status: 400,
      payload: {
        error: "Unexpected Apps Script response",
        message: "Expected an array, or an object with certifications/data/rows array."
      }
    };
  }

  const imported = rows.map((row, index) => certificateFromAppsScript(row, index + 1));
  portfolio.certifications = mergeCertifications(portfolio.certifications, imported);

  return {
    ok: true,
    status: 200,
    payload: {
      message: `Imported ${imported.length} certificate(s) from Apps Script for this response.`,
      importedCount: imported.length,
      portfolio: normalizePortfolio(portfolio)
    }
  };
}

export async function parseJson(request) {
  const text = await request.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw Object.assign(new Error("Invalid JSON body."), { statusCode: 400 });
  }
}
