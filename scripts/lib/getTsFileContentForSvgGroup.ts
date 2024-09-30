import type { SvgData } from "drawing"

export const getTsFileContentForSvgGroup = (
  groupId: string,
  svgData: SvgData,
) => {
  return `
import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/${groupId}.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    ${Object.entries(svgData.texts)
      .map(([key, text]) => {
        return `{ ...texts.${key}, anchor: "middle_left" },`
      })
      .join("\n")}
  ] as any,
  ports: [
      ${Object.entries(svgData.refblocks)
        .map(([key, point], i) => {
          return `{ ...refblocks.${key}, labels: ["${i + 1}"] }, // TODO add more "standard" labels`
        })
        .join("\n")}
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
`
}
