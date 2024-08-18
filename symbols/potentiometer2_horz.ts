import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/symbols-svg-json/potentiometer2.json"

const { paths, texts, bounds, refblocks } = svgJson

export default defineSymbol({
  primitives: [...Object.values(paths), ...Object.values(texts)] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})