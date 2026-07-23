import { defineSymbol } from "drawing/defineSymbol"

export default defineSymbol({
  primitives: [
    {
      type: "path",
      points: [
        { x: -0.2, y: 0 },
        { x: 0, y: 0 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: Array.from({ length: 32 }, (_, i) => {
        const angle = Math.PI / 2 - (i * Math.PI) / 31
        const r = 0.1
        return { x: 0.1 - r * Math.cos(angle), y: r * Math.sin(angle) }
      }),
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: -0.2, y: -0.2 },
        { x: 0.2, y: 0.2 },
      ],
      color: "none",
      fill: false,
    },
    { type: "text", text: "{REF}", x: 0.05, y: 0.125, anchor: "middle_bottom" },
  ],
  ports: [{ x: -0.2, y: 0, labels: ["1"] }],
  center: { x: 0, y: 0 },
})
