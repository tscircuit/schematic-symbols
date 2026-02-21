import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rectifier_diode.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.4,
      y: -0.5,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.4,
      y: 0.5,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.top1, labels: ["2"] },
    { ...refblocks.right1, labels: ["3"] },
    { ...refblocks.bottom1, labels: ["4"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .labelPort("top1", ["1"]) // becomes left after rotation
  .labelPort("right1", ["2"]) // becomes up after rotation
  .labelPort("bottom1", ["3"]) // becomes right after rotation
  .labelPort("left1", ["4"]) // becomes down after rotation
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_right")
  .build()
