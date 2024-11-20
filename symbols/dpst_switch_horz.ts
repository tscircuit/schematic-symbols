import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/dpst_switch.json"
import { Primitive } from "drawing/types"

svgJson.bounds.width += 0.2
const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_bottom", x: 0 },
    { ...texts.bottom1, anchor: "middle_top", x: 0 },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1", "left1"] }, // TODO add more "standard" labels
    { ...refblocks.left3, labels: ["3", "left3"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2", "right1"] }, // TODO add more "standard" labels
    { ...refblocks.right3, labels: ["4", "right3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
