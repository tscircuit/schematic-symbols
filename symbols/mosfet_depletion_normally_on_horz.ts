import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/symbols-svg-json/mosfet_depletion_normally_on.json"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.right1, anchor: "middle_left" },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
