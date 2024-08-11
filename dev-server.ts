import { getSvg, symbols } from "./symbols"

console.log(`Serving on http://localhost:3077`)
Bun.serve({
  port: 3077,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === "/") {
      const symbolEntries = Object.entries(symbols).sort((a, b) =>
        a[0].localeCompare(b[0]),
      )

      const svgGrid = symbolEntries
        .map(([name, symbol]) => {
          const svg = getSvg(symbol, { width: 150, height: 100 })
          return `
          <div class="symbol-container">
            <h3>${name}</h3>
            ${svg}
          </div>
        `
        })
        .join("")

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Schematic Symbols Grid</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 20px;
            }
            .symbol-container {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: center;
            }
            svg {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <h1>Schematic Symbols</h1>
          <div class="grid">
            ${svgGrid}
          </div>
        </body>
        </html>
      `

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      })
    }

    // Serve static files
    return new Response(await Bun.file(url.pathname))
  },
})
