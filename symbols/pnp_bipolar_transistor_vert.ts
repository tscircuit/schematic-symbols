import { modifySymbol } from "../drawing/modify-symbol/modify-symbol"
import svgJson from "assets/generated/pnp_bipolar_transistor.json"

export default modifySymbol({
  primitives: [
    ...Object.values(svgJson.paths),
    ...Object.values(svgJson.circles),
    {
      type: "text",
      text: "{REF}",
      x: 0.5,
      y: -0.3,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.5,
      y: -0.3,
    },
  ] as any,
  ports: [
    { ...svgJson.refblocks.left1, labels: ["1", "collector"] },
    { ...svgJson.refblocks.bottom1, labels: ["2", "base"] },
    { ...svgJson.refblocks.right1, labels: ["3", "emitter"] },
  ],
  size: { width: svgJson.bounds.width, height: svgJson.bounds.height },
  center: { x: svgJson.bounds.centerX, y: svgJson.bounds.centerY },
})
  .rotateRightFacingSymbol("up")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
