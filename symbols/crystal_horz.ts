import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/crystal.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    // { ...texts.top1, anchor: "middle_left" },
    // { ...texts.bottom1, anchor: "middle_left" },
    {
      type: "text",
      text: "{REF}",
      x: -0.012864500000000056,
      y: -0.4150086999999978,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.003850500000000423,
      y: 0.4250087000000011,
      anchor: "middle_top",
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
