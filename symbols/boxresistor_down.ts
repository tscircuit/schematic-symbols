import svgJson from "assets/generated/boxresistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.16,
      y: 0.2294553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.16,
      y: 0.2294553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .changeTextAnchor("{VAL}", "middle_bottom")
  .rotateRightFacingSymbol("down")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .build()
