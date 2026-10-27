import svgJson from "assets/generated/crystal_4pin.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, bounds, refblocks, circles } = svgJson
const symbol = modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { type: "text", text: "{REF}", x: -0.2, y: 0.5 },
    { type: "text", text: "{VAL}", x: 0.2, y: 0.5 },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.left2, labels: ["4", "gnd1"] },
    { ...refblocks.right1, labels: ["2", "gnd2"] },
    { ...refblocks.right2, labels: ["3"] },
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()

export default {
  ...symbol,
  size: { width: 1.4, height: 1.2 },
}
