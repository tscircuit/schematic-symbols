import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/vcc.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.right1, anchor: "middle_left" },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
