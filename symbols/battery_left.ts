import svgJson from "assets/generated/battery.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, bounds, refblocks, circles } = svgJson
const symbol = modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.22,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 0.28,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()

export default {
  ...symbol,
  size: { width: 0.95, height: 0.65 },
}
