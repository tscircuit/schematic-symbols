import { svgPathToPoints } from "drawing"
import fs from "fs"
import path from "path/posix"
import { parse } from "svgson"
import { compose, scale, toSVG, translate } from "transformation-matrix"
import { convertToObjectWithOrderedPositionIds } from "../convertToObjectWithOrderedPositionIds"
import { applyGroupTransformsToChildren } from "./applyGroupTransformsToChildren"
import { findInnerText } from "./findInnerText"
import { getBoundsOfSvgJson } from "./getBoundsOfSvgJson"
import { getTsFileContentForSvgGroup } from "./getTsFileContentForSvgGroup"
import kleur from "kleur"

const SOURCE_IGNORE_LIST = ["testshape"]

export async function processSvg(symbolsSvg: string, fileName?: string) {
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
    rootGroup.children
      .filter((child) => child.name === "g")
      .forEach((group, index) => {
        const groupId = fileName ?? group.attributes.id
        try {
          const filePath = `./assets/generated/${groupId}.json`
          let groupWithTransformApplied = applyGroupTransformsToChildren(group)

          // Recenter the group (makes it easier to read)
          let bounds = getBoundsOfSvgJson(groupWithTransformApplied as any)
          groupWithTransformApplied.attributes.transform = toSVG(
            compose(
              scale(0.1, 0.1),
              translate(-bounds.centerX, -bounds.centerY),
            ),
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
                x: Number.parseFloat(child.attributes.cx),
                y: Number.parseFloat(child.attributes.cy),
              })),
          )

          const textChildren = groupWithTransformApplied.children.filter(
            (text) => text.name === "text",
          )
          const texts = convertToObjectWithOrderedPositionIds(
            textChildren.map((text) => ({
              type: "text",
              text: findInnerText(text),
              x: Number.parseFloat(text.attributes.x),
              y: Number.parseFloat(text.attributes.y),
            })),
          )

          const pathChildren = groupWithTransformApplied.children.filter(
            (path) => path.name === "path",
          )
          const paths = Object.fromEntries(
            pathChildren.map((path) => [
              path.attributes.id!,
              {
                type: "path",
                points: svgPathToPoints(path.attributes.d!),
                color: "primary",
                fill:
                  path.attributes.fill === "true" &&
                  !path.attributes.style?.includes("fill:none"),
              },
            ]),
          )

          const circleChildren = groupWithTransformApplied.children.filter(
            (circle) => circle.name === "circle",
          )
          const circles = Object.fromEntries(
            circleChildren
              .filter((circle) => !circle.attributes.id.includes("refblock"))
              .map((circle) => [
                circle.attributes.id!,
                {
                  type: "circle",
                  x: Number.parseFloat(circle.attributes.cx),
                  y: Number.parseFloat(circle.attributes.cy),
                  radius: Number.parseFloat(circle.attributes.r),
                  color: "primary",
                  fill:
                    !circle.attributes.style?.includes("fill:none") &&
                    circle.attributes.fill !== "none",
                },
              ]),
          )

          const svgData = {
            // only for debugging
            // svg: groupWithTransformApplied,
            paths,
            texts,
            refblocks,
            bounds,
            circles,
          }

          console.log(`Writing to file: ${kleur.green(filePath)}`)
          fs.writeFileSync(filePath, JSON.stringify(svgData, null, 2))

          if (SOURCE_IGNORE_LIST.includes(groupId)) {
            return
          }

          // Check if there's a source file for this symbol
          const outputPath = `./symbols/${groupId}_horz.ts`
          const hasSourceFile = fs.existsSync(outputPath)
          const isReadyForGen =
            Object.keys(texts).length > 0 &&
            Object.keys(paths).length > 0 &&
            Object.keys(refblocks).length > 0

          if (!hasSourceFile && !isReadyForGen) {
            console.log(
              `Skipping ${groupId} because it's not ready for generation (missing some elements)`,
            )
            console.log(`  - texts: ${Object.keys(texts).length}`)
            console.log(`  - paths: ${Object.keys(paths).length}`)
            console.log(`  - refblocks: ${Object.keys(refblocks).length}`)
          } else if (!hasSourceFile && isReadyForGen) {
            console.log(`Creating horz source file: ${outputPath}`)
            const content = getTsFileContentForSvgGroup(groupId, svgData as any)
            fs.writeFileSync(outputPath, content)
            // Write the vert file
            const vertOutputPath = `./symbols/${groupId}_vert.ts`
            console.log(`Creating vert source file: ${vertOutputPath}`)
            const contentVert = `import { rotateSymbol } from "drawing/rotateSymbol"\nimport ${groupId}_horz from "./${groupId}_horz"\n\nexport default rotateSymbol(${groupId}_horz)`
            fs.writeFileSync(vertOutputPath, contentVert)
          } else {
            console.log(
              `Skipping generating ${groupId}_horz.ts and ${groupId}_vert.ts because it already has a source file`,
            )
          }
        } catch (err: any) {
          console.log(`Error processing ${groupId}: ${err.message}`)
        }
      })
  } catch (error) {
    console.error("Error processing SVG:", error)
  }
}

export async function processAllSvgs() {
  const svgDir = path.resolve(__dirname, "../../assets/symbols")

  try {
    const files = await fs.promises.readdir(svgDir)
    const svgFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".svg",
    )

    for (const file of svgFiles) {
      const filePath = path.join(svgDir, file)
      try {
        const data = await fs.promises.readFile(filePath, "utf8")
        await processSvg(data)
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err)
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${svgDir}:`, err)
  }
}
