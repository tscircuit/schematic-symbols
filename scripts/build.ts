import { generateWebPage } from "./lib/generate-web-page"
import fs from "fs"
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

console.log("Static HTML file generated at public/index.html")
