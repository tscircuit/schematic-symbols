import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/potentiometer2.json"
import { Primitive } from "drawing/types"
import { TextPrimitive } from "../drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    {
      type: "text",
      text: "{REF}",
      x: -0.21558434999999943,
      y: 0.3881423704999989,
    },
    {
      type: "text",
      text: "{VAL}",
      x: -0.32581994999999955,
      y: -0.12491692950000122,
    } as TextPrimitive,
  ] as Primitive[],
  ports: [
    { ...refblocks.bottom1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["2"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["3"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
