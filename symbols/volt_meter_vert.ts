import svgJson from "assets/generated/volt_meter.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, circles, refblocks } = svgJson

const symbol = modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.2,
      y: 0.35,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.2,
      y: 0.35,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["left1"] },
    { ...refblocks.right1, labels: ["right1"] },
  ],
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()

export default symbol
