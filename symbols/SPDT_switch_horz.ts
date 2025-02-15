import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/spdt_switch.json"
import { Primitive } from "drawing/types"

svgJson.bounds.width += 0.2
const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_bottom", x: -0.01 },
    { ...texts.bottom1, anchor: "middle_top", x: -0.01 },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["3"] }, // TODO add more "standard" labels
    { ...refblocks.right2, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
