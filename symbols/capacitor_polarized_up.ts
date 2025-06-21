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
      x: -0.2,
      y: 0.2094553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.3,
      y: 0.2094553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["2", "neg"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["1", "pos"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "top_left")
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{REF}", "bottom_left")
  .build()
