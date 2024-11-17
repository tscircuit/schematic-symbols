import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/ground.json"
import { Primitive } from "drawing/types"
import { rotateSymbol } from "drawing/rotateSymbol"

// Extract paths, bounds, etc.
const { paths, circles, bounds, refblocks } = svgJson

// Horizontal orientation symbol
export const horizontalSymbol = defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}", // REF label for horizontal
      x: -0.1, // Adjust this for the horizontal positioning of REF
      y: -0.8, // Adjust this for the vertical positioning of REF
      anchor: "middle_bottom", // Horizontal anchor for REF
    },
    {
      type: "text",
      text: "{VAL}", // VAL label for horizontal
      x: -0.1, // Adjust for horizontal positioning of VAL
      y: -0.1, // Adjust for vertical positioning of VAL
      anchor: "middle_top", // Horizontal anchor for VAL
    },
  ] as Primitive[],
  ports: [{ ...refblocks.top1, labels: ["1"] }],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})

// Vertical orientation symbol

// Export vertical symbol (rotated 90 degrees from original)
export default horizontalSymbol
