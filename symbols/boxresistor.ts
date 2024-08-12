import { path } from "drawing/path"
import { text } from "drawing/text"
import { defineSymbol } from "drawing/defineSymbol"

export default defineSymbol({
  primitives: [
    path({
      points: [
        { x: 0, y: 0 },
        { x: 0.2, y: 0 },
        { x: 0.2, y: -0.12 },
        { x: 0.8, y: -0.12 },
        { x: 0.8, y: 0.12 },
        { x: 0.2, y: 0.12 },
        { x: 0.2, y: 0 },
      ],
      color: "primary",
    }),
    path({
      points: [
        { x: 0.8, y: 0 },
        { x: 1, y: 0 },
      ],
      color: "primary",
    }),
    text("{REF}", { x: 0.5, y: -0.2, anchor: "middle_bottom" }),
  ],
  ports: [
    { x: 0, y: 0, labels: ["1", "-"] },
    { x: 1, y: 0, labels: ["2", "+"] },
  ],
  center: { x: 0.5, y: 0 },
  size: { width: 1, height: 0.55 },
})
