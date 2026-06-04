import { isAdmin, json, methodNotAllowed, unauthorized } from "../../lib/portfolio.mjs";

export default {
  fetch(request) {
    if (request.method !== "DELETE") return methodNotAllowed(["DELETE"]);
    if (!isAdmin(request)) return unauthorized();

    return json({
      error: "Not persisted on Vercel",
      message: "Vercel cannot delete records from local JSON at runtime. Remove the certificate from api/data/portfolio.json before deploy, manage it in Apps Script, or connect a database."
    }, 501);
  }
};
