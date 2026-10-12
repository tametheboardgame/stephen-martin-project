import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT) || 8080;
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".json": "application/json" };
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const relative = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const filepath = path.resolve(root, "." + relative);
    if (filepath !== root && !filepath.startsWith(root + path.sep)) {
      response.writeHead(403); response.end("Forbidden"); return;
    }
    const body = await fs.readFile(filepath);
    response.writeHead(200, { "Content-Type": (mime[path.extname(filepath)] || "application/octet-stream") + "; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    response.end(body);
  } catch (error) {
    response.writeHead(error?.code === "ENOENT" ? 404 : 500);
    response.end(error?.code === "ENOENT" ? "Not found" : "Preview server error");
  }
});
server.listen(port, "127.0.0.1", () => {
  console.log("GAME-SP1 local preview: http://localhost:" + port + "/");
  console.log("The preview is served only on your own computer. No public deployment.");
});
