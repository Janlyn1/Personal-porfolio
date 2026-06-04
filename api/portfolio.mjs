import { json, loadPortfolio, methodNotAllowed, normalizePortfolio } from "../lib/portfolio.mjs";

export default {
  async fetch(request) {
    if (request.method === "GET") {
      return json(normalizePortfolio(loadPortfolio()));
    }

    if (request.method === "PUT") {
      return json({
        error: "Not writable on Vercel",
        message: "Vercel functions cannot persist edits to local JSON. Edit api/data/portfolio.json before deploy, use Apps Script sync, or connect a database."
      }, 501);
    }

    return methodNotAllowed(["GET", "PUT"]);
  }
};
