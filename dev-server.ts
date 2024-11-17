import symbols from "./generated/symbols-index"
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
    if (url.pathname.endsWith(".json")) {
      const symbolName = url.pathname.slice(1, -5)
      const symbol = symbols[symbolName as keyof typeof symbols]
      return new Response(JSON.stringify(symbol, null, 2), {
        headers: { "Content-Type": "application/json" },
      })
    }

    // Serve static files
    return new Response("", {
      status: 404,
    })
    // return new Response(await Bun.file(url.pathname))
  },
})
