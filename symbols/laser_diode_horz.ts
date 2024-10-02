import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/laser_diode.json"
import { Primitive } from "drawing/types"
import { TextPrimitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.bottom1, x: 0.1, anchor: "middle_right" } as TextPrimitive,
    { ...texts.right1, anchor: "middle_left" } as TextPrimitive,
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
