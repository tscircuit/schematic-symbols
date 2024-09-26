import svgJson from "assets/symbols-svg-json/capacitor.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, bounds, refblocks, texts } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    { ...texts.top1, anchor: "center" },
    { ...texts.bottom1, anchor: "center" },
  ] as any,
  ports: [],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
