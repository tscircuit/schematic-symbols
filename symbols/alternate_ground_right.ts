import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/alternate_ground.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_left" },
  ] as Primitive[],
  ports: [
    { ...refblocks.right1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
