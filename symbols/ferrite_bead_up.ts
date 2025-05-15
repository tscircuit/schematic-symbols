import svgJson from "../assets/generated/ferrite_bead.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: 0.18,
      y: -0.3204553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.25,
      y: -0.3294553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .labelPort("left", ["1"])
  .labelPort("right", ["2"])
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
