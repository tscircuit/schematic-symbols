import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/crystal_4pin.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.left1, anchor: "middle_right" },
    { ...texts.right1, anchor: "center" },
  ] as Primitive[],
  ports: [
    { ...refblocks.top1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["4"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
