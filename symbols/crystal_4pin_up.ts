import svgJson from "assets/generated/crystal_4pin.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{VAL}",
      x: -0.4,
      y: -0.4094554499999995,
    },
    {
      type: "text",
      text: "{REF}",
      x: 0.4,
      y: -0.4094553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["3"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.top1, labels: ["4"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{REF}", "bottom_left")
  .changeTextAnchor("{VAL}", "top_left")
  .build()
