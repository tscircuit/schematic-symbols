import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/mushroom_head_normally_open_momentary.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_bottom", x: 0 },
    { ...texts.bottom1, anchor: "middle_top", x: 0 },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX + 0.006, y: bounds.centerY + 0.06 },
})
