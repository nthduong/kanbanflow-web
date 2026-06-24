let apiRoot = "";

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:8017";
}
if (process.env.BUILD_MODE === "prod") {
  // apiRoot = "https://kanban-api-8trx.onrender.com";
  apiRoot = "https://kanban-api-production-fa5b.up.railway.app";
}

export const API_ROOT = apiRoot;

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;
