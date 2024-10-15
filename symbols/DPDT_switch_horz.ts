import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/dpdt_switch.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_bottom" },
    { ...texts.bottom1, anchor: "middle_top" },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.left2, labels: ["4"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["3"] }, // TODO add more "standard" labels
    { ...refblocks.right2, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.right3, labels: ["6"] }, // TODO add more "standard" labels
    { ...refblocks.right5, labels: ["5"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
