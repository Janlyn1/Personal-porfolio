import { json, methodNotAllowed } from "../lib/portfolio.mjs";

export default {
  fetch(request) {
    if (request.method !== "GET") return methodNotAllowed(["GET"]);
    return json({ ok: true, service: "janlyn-portfolio-api", runtime: "vercel" });
  }
};
