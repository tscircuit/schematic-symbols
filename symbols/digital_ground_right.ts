import svgJson from "assets/generated/digital_ground.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, bounds, refblocks } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    {
      type: "text",
      text: "{REF}",
      x: -0.14,
      y: -0.0,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["1"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
