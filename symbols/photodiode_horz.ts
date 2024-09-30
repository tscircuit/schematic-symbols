import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/photodiode.json"
import { TextPrimitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.15,
      y: -0.20318344999999938,
      anchor: "middle_right",
    } as TextPrimitive,
    {
      type: "text",
      text: "{VAL}",
      x: -0.00984920000000078,
      y: 0.5,
      anchor: "middle_top",
    } as TextPrimitive,
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
