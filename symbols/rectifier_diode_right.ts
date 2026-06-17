import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rectifier_diode.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, x: 0.4, y: 0.35 },
    { ...texts.bottom1, x: 0.4, y: -0.35 },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["2"] },
    { ...refblocks.top1, labels: ["3"] },
    { ...refblocks.right1, labels: ["4"] },
    { ...refblocks.bottom1, labels: ["1"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["2"])
  .labelPort("top1", ["3"])
  .labelPort("right1", ["4"])
  .labelPort("bottom1", ["1"])
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
