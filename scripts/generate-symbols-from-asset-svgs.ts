import symbolsSvg from "../assets/symbols.svg" with { type: "text" }
import { parse } from "svgson"
import fs from "node:fs"
import { applyGroupTransformsToChildren } from "./lib/applyGroupTransformsToChildren"

async function processSvg() {
  try {
    // Parse the entire SVG file once
    const parsedSvg = await parse(symbolsSvg)

    // Find the root group
    const rootGroup = parsedSvg.children.find(
      (child) => child.name === "g" && child.attributes.id === "root",
    )

    if (!rootGroup) {
      console.error("Root group not found")
      return
    }

    // Process each subgroup under the root
    rootGroup.children.forEach((group, index) => {
      if (group.name === "g") {
        const groupId = group.attributes.id
        const filePath = `./assets/symbols-svg-json/${groupId}.json`
        // const groupWithTransformApplied = applyGroupTransformsToChildren(group)
        console.log(`Writing to file: ${filePath}`)
        fs.writeFileSync(filePath, JSON.stringify(group, null, 2))
      }
    })
  } catch (error) {
    console.error("Error processing SVG:", error)
  }
}

processSvg()

console.log("Processing complete.")
