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
      x: -0.3,
      y: -0.3894553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.3,
      y: 0.3194553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left, labels: ["1"] },
    { ...refblocks.right, labels: ["2"] },
    { ...refblocks.bottom, labels: ["3"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("left")
  .labelPort("left", ["1"])
  .labelPort("right", ["2"])
  .labelPort("bottom", ["3"])

  .changeTextAnchor("{REF}", "middle_bottom")
  .changeTextAnchor("{VAL}", "middle_top")
  .build()
