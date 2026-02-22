import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rectifier_diode.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_left" },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["3"] },
    { ...refblocks.top1, labels: ["4"] },
    { ...refblocks.right1, labels: ["1"] },
    { ...refblocks.bottom1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("left")
  .labelPort("right1", ["3"]) // becomes left after rotation
  .labelPort("bottom1", ["4"]) // becomes up after rotation
  .labelPort("left1", ["1"]) // becomes right after rotation
  .labelPort("top1", ["2"]) // becomes down after rotation
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
