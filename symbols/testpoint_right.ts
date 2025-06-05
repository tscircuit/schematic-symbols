import { defineSymbol } from "drawing/defineSymbol"

export default defineSymbol({
  primitives: [
    {
      type: "path",
      points: [
        { x: -0.4, y: 0 },
        { x: 0, y: 0 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: 0, y: -0.2 },
        { x: 0.15, y: 0 },
        { x: 0, y: 0.2 },
      ],
      color: "primary",
      fill: false,
    },
    { type: "text", text: "{REF}", x: 0.25, y: 0, anchor: "middle_left" },
  ],
  ports: [{ x: -0.4, y: 0, labels: ["1"] }],
  center: { x: 0, y: 0 },
})
