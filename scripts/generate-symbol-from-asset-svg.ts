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

  const fileResponse = await prompts({
    type: "autocomplete",
    name: "file",
    message: "Select a symbol file to process:",
    choices: files.map((file) => ({ title: file, value: file })),
  })

  if (fileResponse.file) {
    const directionResponse = await prompts({
      type: "select",
      name: "direction",
      message: "Which orientation of SVG do you want?",
      choices: [
        { title: "Horizontal, Vertical", value: ["horz", "vert"] },
        {
          title: "Right, Up, Left, Down",
          value: ["right", "up", "left", "down"],
        },
      ],
    })

    if (directionResponse.direction) {
      const filePath = path.join(symbolsDir, fileResponse.file)
      await processSvg(
        fs.readFileSync(filePath, "utf-8"),
        fileResponse.file.split(".")[0],
        directionResponse.direction,
      )
    } else {
      console.log("No orientation selected. Exiting.")
    }
  } else {
    console.log("No file selected. Exiting.")
  }
}

main().catch(console.error)
