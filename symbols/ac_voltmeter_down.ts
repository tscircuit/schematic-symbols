import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/ac_voltmeter.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

const {
  "path11-5-5": _chev,
  path17: _s1,
  path18: _s2,
  path19: _s3,
  path20: _s4,
  ...structuralPaths
} = paths

// After -90° rotation the circle center moves from (0, 0.04) to (0.04, 0).
const cx = 0.04
const cy = 0

export default modifySymbol({
  primitives: [
    ...Object.values(structuralPaths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.15,
      y: 0.3894553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.15,
      y: 0.3894553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .addPrimitives([
    {
      type: "path",
      points: [
        { x: cx + 0.1, y: cy + 0.09 },
        { x: cx, y: cy - 0.1 },
        { x: cx - 0.11, y: cy + 0.09 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx, y: cy - 0.17 },
        { x: cx + 0.07, y: cy - 0.15 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx + 0.07, y: cy - 0.15 },
        { x: cx + 0.14, y: cy - 0.17 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx - 0.15, y: cy - 0.17 },
        { x: cx - 0.07, y: cy - 0.15 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx - 0.07, y: cy - 0.15 },
        { x: cx, y: cy - 0.17 },
      ],
      color: "primary",
      fill: false,
    },
  ] as any)
  .build()
