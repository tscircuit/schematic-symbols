import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/igbt_transistor.json"
import { TextPrimitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.4,
      anchor: "middle_right",
    } as TextPrimitive,
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.4,
      anchor: "middle_right",
    } as TextPrimitive,
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX + 0.06, y: bounds.centerY },
})
