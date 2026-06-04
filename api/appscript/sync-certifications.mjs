import { isAdmin, json, methodNotAllowed, syncAppsScriptCertificates, unauthorized } from "../../lib/portfolio.mjs";

export default {
  async fetch(request) {
    if (request.method !== "POST") return methodNotAllowed(["POST"]);
    if (!isAdmin(request)) return unauthorized();

    const result = await syncAppsScriptCertificates();
    return json(result.payload, result.status);
  }
};
