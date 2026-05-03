import svgJson from "assets/generated/relay.json"
import { defineSymbol } from "drawing/defineSymbol"

const { paths, circles, bounds } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { type: "text", text: "{REF}", x: 0, y: 0.55, anchor: "middle_bottom" },
    { type: "text", text: "{VAL}", x: 0, y: -0.62, anchor: "middle_top" },
  ] as any,
  ports: [
    { x: -0.6, y: 0.06, labels: ["contact_common", "1", "COM"] },
    { x: 0.6, y: 0.06, labels: ["contact_normally_closed", "3", "NC"] },
    { x: 0.6, y: 0.3, labels: ["contact_normally_open", "2", "NO"] },
    { x: -0.6, y: -0.3, labels: ["coil_1", "4", "A1"] },
    { x: 0.6, y: -0.3, labels: ["coil_2", "5", "A2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
