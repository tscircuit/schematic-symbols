import { defineSymbol } from "drawing/defineSymbol";
import svgJson from "assets/generated/dpdp_switch.json";
import { Primitive } from "drawing/types";

const { paths, texts, bounds, refblocks, circles } = svgJson;

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_bottom" },
    { ...texts.bottom1, anchor: "middle_top" },
  ] as Primitive[],

  ports: [
    { ...refblocks.left1, labels: ["1"] },
    { ...refblocks.left2, labels: ["4"] },
    { ...refblocks.right1, labels: ["3"] },
    { ...refblocks.right2, labels: ["2"] },
    { ...refblocks.right3, labels: ["6"] },
    { ...refblocks.right5, labels: ["5"] },
  ],

  size: { width: bounds.width, height: bounds.height },
  center: { x: bounds.centerX, y: bounds.centerY },
});
