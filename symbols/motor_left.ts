import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/motor.json"

const { circles } = svgJson

export default defineSymbol({
  primitives: [
    circles.body,
    { type: "text", text: "M", x: 0, y: 0, anchor: "center", fontSize: 0.3 },
    { type: "text", text: "{REF}", x: 0, y: 0.44, anchor: "middle_bottom" },
    { type: "text", text: "{VAL}", x: 0, y: -0.44, anchor: "middle_top" },
    {
      type: "path",
      points: [
        { x: 0.5, y: 0 },
        { x: 0.25, y: 0 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: -0.25, y: 0 },
        { x: -0.5, y: 0 },
      ],
      color: "primary",
      fill: false,
    },
  ] as any,
  ports: [
    { x: 0.5, y: 0, labels: ["1"] },
    { x: -0.5, y: 0, labels: ["2"] },
  ],
  size: { width: 1, height: 0.9 },
  center: { x: 0, y: 0 },
})
