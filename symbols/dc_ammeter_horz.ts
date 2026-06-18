import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/dc_ammeter.json"

const { paths, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    paths.path11,
    paths.path12,
    {
      type: "path",
      points: [
        { x: -0.12, y: 0.14 },
        { x: 0.12, y: 0.14 },
      ],
      color: "primary",
      fill: false,
    },
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.3594553499999995,
      anchor: "middle_top",
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.35,
      anchor: "middle_bottom",
    },
    {
      type: "path",
      points: [
        { x: -0.115, y: -0.16 },
        { x: -0.085, y: -0.16 },
        { x: 0.01, y: 0.09 },
        { x: -0.015, y: 0.09 },
      ],
      color: "primary",
      fill: true,
      closed: true,
    },
    {
      type: "path",
      points: [
        { x: 0.085, y: -0.16 },
        { x: 0.115, y: -0.16 },
        { x: 0.015, y: 0.09 },
        { x: -0.01, y: 0.09 },
      ],
      color: "primary",
      fill: true,
      closed: true,
    },
    {
      type: "path",
      points: [
        { x: -0.055, y: -0.04 },
        { x: 0.055, y: -0.04 },
        { x: 0.055, y: -0.07 },
        { x: -0.055, y: -0.07 },
      ],
      color: "primary",
      fill: true,
      closed: true,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
