import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/rectifier_diode.json"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_right" },
    { ...texts.bottom1, anchor: "middle_right" },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] },
    { ...refblocks.bottom1, labels: ["2"] },
    { ...refblocks.left1, labels: ["3"] },
    { ...refblocks.right1, labels: ["4"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .labelPort("top1", ["1"])
  .labelPort("bottom1", ["2"])
  .labelPort("left1", ["3"])
  .labelPort("right1", ["4"])
  .changeTextAnchor("{REF}", "middle_right")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
