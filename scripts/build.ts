import { generateWebPage } from "./lib/generate-web-page";
import fs from "fs/promises";
import path from "path";

const distDir = path.join(process.cwd(), "public");

async function createStaticHTMLFile() {
  try {
    // Ensure the dist directory exists
    if (!await fs.access(distDir).then(() => true).catch(() => false)) {
      await fs.mkdir(distDir, { recursive: true });
      console.log(`Directory ${distDir} created`);
    }

    // Generate the HTML content
    const htmlContent = generateWebPage();

    // Write the HTML content to dist/index.html
    const filePath = path.join(distDir, "index.html");
    await fs.writeFile(filePath, htmlContent);
    console.log(`Static HTML file generated at ${filePath}`);
    
  } catch (error) {
    console.error("Error generating static HTML file:", error);
  }
}

// Execute the function
createStaticHTMLFile();
