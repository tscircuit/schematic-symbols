import svgJson from "assets/generated/rail.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    {
      type: "text",
      text: "{REF}",
      x: -0.14,
      y: 0,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
