import svgJson from "assets/generated/ground_alt.json"
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
      y: 0.21,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: -0.21,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
