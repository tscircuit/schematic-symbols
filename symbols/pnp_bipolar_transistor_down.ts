import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/pnp_bipolar_transistor.json"
const { paths, texts, bounds, refblocks, circles } = svgJson

export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.5,
      y: -0.3,
    },
    {
      type: "text",
      text: "{VAL}",
      x: 0.5,
      y: -0.3,
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1", "collector"] },
    { ...refblocks.bottom1, labels: ["2", "base"] },
    { ...refblocks.right1, labels: ["3", "emitter"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("down")
  .changeTextAnchor("{REF}", "middle_right")
  .changeTextAnchor("{VAL}", "middle_right")
  .build()
