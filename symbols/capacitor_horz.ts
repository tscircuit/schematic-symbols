import svgJson from "assets/symbols-svg-json/capacitor.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, bounds, refblocks, texts } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_right" },
  ] as any,
  ports: [],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
