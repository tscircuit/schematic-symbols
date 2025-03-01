import { rotateSymbol } from "drawing/rotateSymbol"
import type { TextPrimitive } from "drawing"
import tilted_digital_ground_right from "./tilted_digital_ground_right"

// Rotate the symbol to "up" orientation
const rotatedSymbol = rotateSymbol(tilted_digital_ground_right, "up")

// Find the text primitives
const ref = rotatedSymbol.primitives.find(
  (p) => p.type === "text" && p.text === "{REF}",
) as TextPrimitive | undefined

const val = rotatedSymbol.primitives.find(
  (p) => p.type === "text" && p.text === "{VAL}",
) as TextPrimitive | undefined

// Check if text primitives exist and bounds are available, then center the text
if (ref && rotatedSymbol.bounds) {
  // Center "{REF}" vertically on the left side
  ref.x = rotatedSymbol.bounds.minX - 0.1 // Slightly left of the symbol
  ref.y = rotatedSymbol.center.y // Vertically centered
  ref.anchor = "middle_right" // Text extends rightward from x
}

if (val && rotatedSymbol.bounds) {
  // Center "{VAL}" vertically on the right side
  val.x = rotatedSymbol.bounds.maxX + 0.1 // Slightly right of the symbol
  val.y = rotatedSymbol.center.y // Vertically centered
  val.anchor = "middle_left" // Text extends leftward from x
}

// Export the modified symbol
export default rotatedSymbol
