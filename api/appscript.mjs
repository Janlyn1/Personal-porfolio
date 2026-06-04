import { getAppsScriptConfig, json, loadPortfolio, methodNotAllowed } from "../lib/portfolio.mjs";

export default {
  fetch(request) {
    if (request.method !== "GET") return methodNotAllowed(["GET"]);
    return json(getAppsScriptConfig(loadPortfolio()));
  }
};
