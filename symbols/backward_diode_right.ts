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
      x: -0.0050250999999996715,
      y: 0.27384529999999985,
      anchor: "middle_left",
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.00011179999999999524,
      y: -0.27384530000000007,
      anchor: "middle_left",
    },
  ] as any[],
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_top")
  .rotateRightFacingSymbol("right")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
