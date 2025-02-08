import svgJson from "assets/generated/potentiometer3.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.bottom1, anchor: "middle_top" },
    { ...texts.top1, anchor: "middle_bottom" },
  ] as any,
  ports: [
    { ...refblocks.left, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right, labels: ["3"] }, // TODO add more "standard" labels
    { ...refblocks.bottom, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
