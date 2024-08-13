import { generateWebPage } from "./scripts/lib/generate-web-page"

console.log(`Serving on http://localhost:3077`)
Bun.serve({
  port: 3077,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === "/") {
      const html = generateWebPage()
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      })
    }

    // Serve static files
    return new Response("", {
      status: 404,
    })
    // return new Response(await Bun.file(url.pathname))
  },
})
