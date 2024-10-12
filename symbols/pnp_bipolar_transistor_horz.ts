import svgJson from "assets/generated/pnp_bipolar_transistor.json"
import { defineSymbol } from "drawing/defineSymbol"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.07,
      y: -0.3596647999999991,
      anchor: "middle_right",
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.0679100444999996,
      y: 0.4129789000000006,
      anchor: "middle_right",
    },
  ] as Primitive[],
  ports: [
    { ...refblocks.top1, labels: ["1", "collector"] },
    { ...refblocks.bottom1, labels: ["2", "emitter"] },
    { ...refblocks.left1, labels: ["3", "base"] },
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
