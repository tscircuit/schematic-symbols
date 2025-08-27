import { svgPathToPoints } from "drawing"
import fs from "fs"
import path from "path/posix"
import { parse } from "svgson"
import { compose, scale, toSVG, translate } from "transformation-matrix"
import { convertToObjectWithOrderedPositionIds } from "../../convertToObjectWithOrderedPositionIds"
import { applyGroupTransformsToChildren } from "../applyGroupTransformsToChildren"
import { findInnerText } from "../findInnerText"
import { getBoundsOfSvgJson } from "../getBoundsOfSvgJson"
import { getTsFileContentForSvgGroup } from "../getTsFileContentForSvgGroup"
import { logger } from "../../../logger"

const SOURCE_IGNORE_LIST = ["testshape"]

/**
 * Inkscape SVGs are generated with "Y-up is negative", but we want "Y-up is positive"
 */
const flipY = (y: number) => -y

export async function processSvg(
  symbolsSvg: string,
  fileName?: string,
  orientations: string[] = ["right", "left", "up", "down", "horz", "vert"],
) {
  try {
    // Parse the entire SVG file once
    const parsedSvg = await parse(symbolsSvg)

    // Find the root group
    const rootGroup = parsedSvg.children.find(
      (child) => child.name === "g" && child.attributes.id === "root",
    )

    if (!rootGroup) {
      logger.error("Root group not found")
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
              scale(0.1, -0.1),
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
            paths,
            texts,
            refblocks,
            bounds,
            circles,
          }

          logger.info("Writing to file", { filePath })
          fs.writeFileSync(filePath, JSON.stringify(svgData, null, 2))

          if (SOURCE_IGNORE_LIST.includes(groupId)) {
            return
          }

          // Generate source files based on provided orientations
          const defaultOrientation = orientations[0] // Default to first orientation
          orientations.forEach((orientation) => {
            const outputPath = `./symbols/${groupId}_${orientation}.ts`
            const hasSourceFile = fs.existsSync(outputPath)
            const isReadyForGen =
              Object.keys(texts).length > 0 &&
              Object.keys(paths).length > 0 &&
              Object.keys(refblocks).length > 0

            if (!hasSourceFile && !isReadyForGen) {
              logger.info("Skipping group", {
                groupId,
                texts: Object.keys(texts).length,
                paths: Object.keys(paths).length,
                refblocks: Object.keys(refblocks).length,
              })
              return
            }
            logger.info("Creating source file", { orientation, outputPath })

            // call the new fn with orientation
            const content = getTsFileContentForSvgGroup(
              groupId,
              svgData as any,
              orientation,
            )

            fs.writeFileSync(outputPath, content)
            logger.info("Source file created", { outputPath })
          })
        } catch (err: any) {
          logger.error("Error processing group", {
            groupId,
            error: err.message,
          })
        }
      })
  } catch (error) {
    logger.error("Error processing SVG", { error })
  }
}

export async function processAllSvgs() {
  const svgDir = path.resolve(import.meta.dirname, "../../../assets/symbols")

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
        logger.error("Error reading file", { filePath, error: err })
      }
    }
  } catch (err) {
    logger.error("Error reading directory", { directory: svgDir, error: err })
  }
}
