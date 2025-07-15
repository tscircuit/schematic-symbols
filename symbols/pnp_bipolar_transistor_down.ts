import svgJson from "../assets/generated/pnp_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"

const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.1,
      y: 0.3094553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.1,
      y: -0.3094553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1"] },
    { ...refblocks.bottom1, labels: ["2"] },
    { ...refblocks.left1, labels: ["3"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("right")
  .changeTextAnchor("{REF}", "middle_right")
  .changeTextAnchor("{VAL}", "middle_right")
  .build()
