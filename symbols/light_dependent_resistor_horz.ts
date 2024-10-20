import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/light_dependent_resistor.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_left", x: 0 },
    { ...texts.bottom1, anchor: "middle_left", x: 0 },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
