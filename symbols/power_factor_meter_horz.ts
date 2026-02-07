import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/power_factor_meter.json"
import { ninePointAnchorToSvgAnchor } from "drawing/ninePointAnchorToSvgAnchor"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    // { ...texts.top1, anchor: "middle_left" },
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: 0.43330070000000064,
      anchor: "middle_bottom",
    },
    // { ...texts.bottom1, anchor: "middle_left" },
    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: -0.43330070000000064,
      anchor: "middle_top",
    },
    // { ...texts.left1, anchor: "middle_left" },
    {
      type: "text",
      text: "COS φ",
      x: 0,
      y: 0.014279000000000375,
      anchor: "center",
    },
  ] as any,
  ports: [
    { ...refblocks.left1, labels: ["1"] }, // TODO add more "standard" labels
    { ...refblocks.right1, labels: ["2"] }, // TODO add more "standard" labels
  ],
  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
})
