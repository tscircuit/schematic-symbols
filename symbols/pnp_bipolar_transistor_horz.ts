import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0.55,
      y: -0.4,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.3,
      y: -0.4,
    },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["3", "collector"] },
    { ...refblocks.bottom1, labels: ["1", "emitter"] },
    { ...refblocks.left1, labels: ["2", "base"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .labelPort("left1", ["2", "base"])
  .labelPort("top1", ["3", "collector"])
  .labelPort("bottom1", ["1", "emitter"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
