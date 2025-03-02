import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/backward_diode.json"
import { Primitive } from "drawing/types"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.0001118,
      y: -0.18,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.0001118,
      y: 0.2738453,
    },
  ] as any[],
  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.right1, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("left")
  .labelPort("left1", ["2"])
  .labelPort("right1", ["1"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
