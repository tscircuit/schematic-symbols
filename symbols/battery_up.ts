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
      x: 0.2,
      y: -0.25,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.2,
      y: -0.25,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{REF}", "middle_left")
  .build()

export default {
  ...symbol,
  size: { width: 0.95, height: 0.9 },
}
