import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/potentiometer3.json"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0.3,
      y: -0.2894553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.3,
      y: -0.2894553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left, labels: ["1"] },
    { ...refblocks.right, labels: ["3"] },
    { ...refblocks.bottom, labels: ["2"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .labelPort("left", ["1"])
  .labelPort("right", ["2"])
  .labelPort("bottom", ["3"])

  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
