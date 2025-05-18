import svgJson from "assets/generated/ground_alt.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    {
      type: "text",
      text: "{REF}",
      x: -0.1,
      y: 0.2,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.1,
      y: 0.2,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
