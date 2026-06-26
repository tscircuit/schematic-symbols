import svgJson from "../assets/generated/boxresistor_small.json"
import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import { resizeSymbol } from "drawing/resizeSymbol"

const { paths, bounds, refblocks, circles } = svgJson as any
const symbol = modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles ?? {}),
    { type: "text", text: "{REF}", x: 0, y: -0.13 },
    { type: "text", text: "{VAL}", x: 0, y: 0.13 },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()

export default resizeSymbol(symbol, { width: 0.65, height: 0.15 })
