import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/led.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.bottom1, anchor: "middle_top" },
    { ...texts.right1, anchor: "middle_bottom" },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1", "anode", "pos"] },
    { ...refblocks.right1, labels: ["2", "cathode", "neg"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
