import { readFile } from "fs/promises";
import path from "path";

// Served under /api/ because abnjunction.com's proxy only forwards specific
// path prefixes (/blog, /case-studies, /_next, /api, ...) to this app — a
// root-level /public file like /favicon-mark.png would 404 on that domain.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "favicon-mark.png");
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
