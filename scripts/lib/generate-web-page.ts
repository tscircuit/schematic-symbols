import { getSvg } from "../../drawing/getSvg";
import symbols from "../../generated/symbols-index";

export function generateWebPage(): string {
  const symbolEntries = Object.entries(symbols).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const svgGrid = symbolEntries
    .map(([name, symbol]) => {
      const svg = getSvg(symbol, { width: 150, height: 150, debug: true });
      return `
      <div class="symbol-container"  style="padding-bottom:32px;  padding-top: 32px; position:relative;">
        <div style="font-size: 12px; position:absolute; word-break: break-all; top: 0; left: 0; padding: 4px; text-align:  left;padding-bottom: 16px;">
        ${name}
        </div>
      ${svg}
      </div>
    `;
    })
    .join("");

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
  `;

  return html;
}
