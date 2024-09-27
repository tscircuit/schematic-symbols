import svgJson from "assets/generated/led.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.bottom1, anchor: "middle_left" },
    { ...texts.right1, anchor: "middle_left" },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1", "anode", "pos"] },
    { ...refblocks.right1, labels: ["2", "cathode", "neg"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY + 0.1 },
})
