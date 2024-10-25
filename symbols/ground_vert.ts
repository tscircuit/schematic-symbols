import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/ground.json"
import { Primitive } from "drawing/types"
import { rotateSymbol } from "drawing/rotateSymbol"

// Extract paths, bounds, etc.
const { paths, circles, bounds, refblocks } = svgJson

export const verticalSymbol = defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}", // REF label for vertical
      x: -0.015, // Adjust this for the horizontal positioning of REF
      y: -0.75, // Adjust this for the vertical positioning of REF
      anchor: "middle_bottom", // Vertical anchor for REF
    },
    {
      type: "text",
      text: "{VAL}", // VAL label for vertical
      x: -0.015, // Adjust for horizontal positioning of VAL
      y: -0.12, // Adjust for vertical positioning of VAL
      anchor: "middle_top", // Vertical anchor for VAL
    },
  ] as Primitive[],
  ports: [{ ...refblocks.top1, labels: ["1"] }],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY - 0.45 },
})

// Export vertical symbol (rotated 90 degrees from original)
export default rotateSymbol(verticalSymbol)
