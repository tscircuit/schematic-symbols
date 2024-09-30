import { processSvg } from "./lib/svg-generation-fns"
import fs from "fs"
import path from "path"
import prompts from "prompts"

async function main() {
  const symbolsDir = path.join(import.meta.dir, "..", "assets", "symbols")
  const files = fs
    .readdirSync(symbolsDir)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => ({
      name: file,
      time: fs.statSync(path.join(symbolsDir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map((file) => file.name)

  const response = await prompts({
    type: "autocomplete",
    name: "file",
    message: "Select a symbol file to process:",
    choices: files.map((file) => ({ title: file, value: file })),
  })

  if (response.file) {
    const filePath = path.join(symbolsDir, response.file)
    await processSvg(
      fs.readFileSync(filePath, "utf-8"),
      response.file.split(".")[0],
    )
  } else {
    console.log("No file selected. Exiting.")
  }
}

main().catch(console.error)
