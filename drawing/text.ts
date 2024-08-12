import type { TextPrimitive } from "drawing"

export function text(
  text: string,
  options: Omit<TextPrimitive, "type" | "text">,
): TextPrimitive {
  return { type: "text", text, ...options }
}
