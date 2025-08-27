import { getSvg } from "drawing/getSvg"
import symbols from "./generated/symbols-index"
import { generateWebPage } from "./scripts/lib/generate-web-page"
import { logger } from "./logger"

logger.info("Serving", { url: "http://localhost:3077" })
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
    if (url.pathname.endsWith(".svg")) {
      const symbolName = url.pathname.slice(1, -4)
      const symbol = symbols[symbolName as keyof typeof symbols]
      return new Response(getSvg(symbol, { width: 150, height: 150 }), {
        headers: { "Content-Type": "image/svg+xml" },
      })
    }

    // Serve static files
    return new Response("", {
      status: 404,
    })
    // return new Response(await Bun.file(url.pathname))
  },
})
