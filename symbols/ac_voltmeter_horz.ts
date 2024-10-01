import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/ac_voltmeter.json"

const { paths, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.3594553499999995,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.35,
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
