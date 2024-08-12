import symbolsSvg from "../assets/symbols.svg" with { type: "text" }
import { parse } from "svgson"
import fs from "node:fs"
import { applyGroupTransformsToChildren } from "./lib/applyGroupTransformsToChildren"
import { getBoundsOfSvgJson } from "drawing/getBoundsOfSvgJson"
import { compose, translate, toSVG, scale } from "transformation-matrix"
import { convertToObjectWithOrderedPositionIds } from "./convertToObjectWithOrderedPositionIds"

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
        let groupWithTransformApplied = applyGroupTransformsToChildren(group)

        // Recenter the group (makes it easier to read)
        let bounds = getBoundsOfSvgJson(groupWithTransformApplied as any)
        groupWithTransformApplied.attributes.transform = toSVG(
          compose(scale(0.1, 0.1), translate(-bounds.centerX, -bounds.centerY)),
        )
        groupWithTransformApplied = applyGroupTransformsToChildren(
          groupWithTransformApplied,
        )

        bounds = getBoundsOfSvgJson(groupWithTransformApplied as any)

        const refblocks = convertToObjectWithOrderedPositionIds(
          groupWithTransformApplied.children
            .filter(
              (child) =>
                child.name === "circle" &&
                (child.attributes["inkscape:label"]?.includes("refblock") ||
                  child.attributes.id?.includes("refblock")),
            )
            .map((child) => ({
              x: parseFloat(child.attributes.cx),
              y: parseFloat(child.attributes.cy),
            })),
        )

        console.log(`Writing to file: ${filePath}`)
        fs.writeFileSync(
          filePath,
          JSON.stringify(
            {
              svg: groupWithTransformApplied,
              paths: [],
              texts: [],
              refblocks: refblocks,
              bounds,
            },
            null,
            2,
          ),
        )
      }
    })
  } catch (error) {
    console.error("Error processing SVG:", error)
  }
}

processSvg()

console.log("Processing complete.")
