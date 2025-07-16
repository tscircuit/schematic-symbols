import type { SvgData } from "drawing"

export const getTsFileContentForSvgGroup = (
  groupId: string,
  svgData: SvgData,
  orientation: string,
) => {
  const { refblocks, texts } = svgData as any

  const labelPorts = Object.entries(refblocks)
    .map(([key], i) => `  .labelPort("${key}", ["${i + 1}"])`)
    .join("\n")

  const textAnchors = Object.entries(texts)
    .map(([_, text]) => {
      const t = text as { text: string }
      return `  .changeTextAnchor("${t.text}", "middle_left")`
    })
    .join("\n")

  return `import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/${groupId}.json"

export default modifySymbol(svgJson)
  .rotateRightFacingSymbol("${orientation === "horz" ? "right" : orientation === "vert" ? "up" : orientation}")
${labelPorts ? labelPorts + "\n" : ""}${textAnchors ? textAnchors + "\n" : ""}  .build()`
}
