import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/tilted_digital_ground.json"
import { Primitive } from "drawing/types"
import { TextPrimitive } from "dist"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.1,
      y: 0.35,
      anchor: "middle_left",
    } as TextPrimitive,
    {
      type: "text",
      text: "{VAL}",
      x: 0.2,
      y: -0.2,
      anchor: "middle_right",
    } as TextPrimitive,
  ] as Primitive[],
  ports: [{ ...refblocks.right1, labels: ["1"] }],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
  bounds: undefined,
})
