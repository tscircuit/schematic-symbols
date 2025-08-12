import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/resonator.json"

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
      x: 0.01596175000000022,
      y: -0.5308501500000009,
      anchor: "middle_top",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.013116750000000454,
      y: 0.5408501499999989,
      anchor: "middle_bottom",
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.right2, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
