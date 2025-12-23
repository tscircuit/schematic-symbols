import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"

const leadLength = 0.6
const circleRadius = 0.3
const currentSourcePrimitives = [
  {
    type: "path",
    points: [
      { x: -leadLength, y: 0 },
      { x: -circleRadius, y: 0 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: circleRadius, y: 0 },
      { x: leadLength, y: 0 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "circle",
    x: 0,
    y: 0,
    radius: circleRadius,
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: -0.1, y: 0 },
      { x: 0.15, y: 0 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: 0.15, y: 0 },
      { x: 0.05, y: 0.08 },
    ],
    color: "primary",
    fill: false,
  },
  {
    type: "path",
    points: [
      { x: 0.15, y: 0 },
      { x: 0.05, y: -0.08 },
    ],
    color: "primary",
    fill: false,
  },
]

export default modifySymbol({
  primitives: [
    ...currentSourcePrimitives,
    {
      type: "text",
      text: "{REF}",
      x: 0.2,
      y: -0.35,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.2,
      y: -0.35,
    },
  ] as any,
  ports: [
    { x: -leadLength, y: 0, labels: ["1"] },
    { x: leadLength, y: 0, labels: ["2"] },
  ],
  center: { x: 0, y: 0 },
  size: { width: leadLength * 2, height: 0.9 },
})
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
