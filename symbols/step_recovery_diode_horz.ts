import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/step_recovery_diode.json"

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
      x: -0.0050250999999996715,
      y: -0.26884529999999884,
      anchor: "middle_bottom",
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.00011179999999999524,
      y: 0.2788453000000004,
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
