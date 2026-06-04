import { isAdmin, json, methodNotAllowed, parseJson, unauthorized, validateCertificate } from "../lib/portfolio.mjs";

export default {
  async fetch(request) {
    if (request.method !== "POST") return methodNotAllowed(["POST"]);
    if (!isAdmin(request)) return unauthorized();

    const input = await parseJson(request);
    const certificate = validateCertificate(input);
    return json({
      error: "Not persisted on Vercel",
      message: "Certificate is valid, but Vercel cannot save it to local JSON. Add it to api/data/portfolio.json before deploy, sync from Apps Script, or connect a database.",
      certificate
    }, 501);
  }
};
