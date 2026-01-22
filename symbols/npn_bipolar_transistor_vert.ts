import svgJson from "assets/generated/npn_bipolar_transistor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
const { paths, texts, bounds, refblocks, circles } = svgJson
export default modifySymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.3,
      y: -0.4094553499999995,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.3,
      y: 0.4094553499999995,
    },
  ] as any,
  ports: [
    { ...refblocks.top1, labels: ["1", "collector"] },
    { ...refblocks.bottom1, labels: ["3", "emitter"] },
    { ...refblocks.left1, labels: ["2", "base"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
  .rotateRightFacingSymbol("left")
  .changeTextAnchor("{REF}", "middle_left")
  .changeTextAnchor("{VAL}", "middle_left")
  .build()
