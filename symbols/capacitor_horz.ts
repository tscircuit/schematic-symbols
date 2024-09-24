import svgJson from "assets/symbols-svg-json/capacitor.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, bounds } = svgJson

export default defineSymbol({
  primitives: [...Object.values(paths)] as any,
  ports: [],
  size: { width: bounds.width, height: bounds.height }, //{ width: 1, height: 0.24 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
