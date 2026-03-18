import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/dc_voltmeter.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

const { "path11-5-5": _chev, path2: _minus, ...structuralPaths } = paths

// After 180° rotation the circle center moves from (0, 0.04) to (0, -0.04).
const cx = 0
const cy = -0.04

export default modifySymbol({
  primitives: [
    ...Object.values(structuralPaths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0,
      y: -0.3294553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.4294553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
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
        { x: cx - 0.12, y: cy - 0.18 },
        { x: cx + 0.12, y: cy - 0.18 },
      ],
      color: "primary",
      fill: false,
    },
  ] as any)
  .build()
