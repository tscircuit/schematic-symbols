import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import type { Primitive } from "../drawing/types"
import svgJson from "assets/generated/ac_voltmeter.json"
import { getACVoltmeterIndicatorPaths } from "../drawing/voltmeter-indicator-paths"

const { paths, texts, bounds, refblocks, circles } = svgJson

// Separate structural paths (lead wires) from internal decorative paths
// (chevron and sine wave inside the circle). The decorative paths are
// re-added after rotation so they stay visually upright.
const {
  "path11-5-5": _chev,
  path17: _s1,
  path18: _s2,
  path19: _s3,
  path20: _s4,
  ...structuralPaths
} = paths

// After 180° rotation (around port midpoint (0, 0.035)) the circle center
// moves from (0, 0.04) to (0, 0.03).
const cx = 0
const cy = 0.03

export default modifySymbol({
  primitives: [
    ...Object.values(structuralPaths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0,
      y: -0.3094553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.4094553499999995,
    },
  ] as Primitive[],
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
  .addPrimitives(getACVoltmeterIndicatorPaths(cx, cy))
  .build()
