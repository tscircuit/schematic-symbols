import svgJson from "assets/generated/capacitor_polarized.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -0.4094553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0,
      y: 0.4094553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["2", "neg"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["1", "pos"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
