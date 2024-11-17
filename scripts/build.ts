import { getSvg } from "drawing/getSvg"
import { generateWebPage } from "./lib/generate-web-page"
import fs from "fs"
import symbols from "generated/symbols-index"
import path from "path/posix"

const distDir = path.join(process.cwd(), "public")

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Generate the HTML content
const htmlContent = generateWebPage()

// Write the HTML content to dist/index.html
fs.writeFileSync(path.join(distDir, "index.html"), htmlContent)

// Write all the json files
for (const symbolName in symbols) {
  const symbol = symbols[symbolName as keyof typeof symbols]
  fs.writeFileSync(
    path.join(distDir, `${symbolName}.json`),
    JSON.stringify(symbol, null, 2),
  )
  fs.writeFileSync(
    path.join(distDir, `${symbolName}.svg`),
    getSvg(symbol, { width: 150, height: 150 }),
  )
}

console.log("Static HTML file generated at public/index.html")
