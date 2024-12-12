import { defineSymbol } from "drawing/defineSymbol"
import svgJson from "assets/generated/seven_segment_display.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_left" },
    { ...texts.top2, anchor: "middle_left" },
    { ...texts.top3, anchor: "middle_left" },
    { ...texts.bottom1, anchor: "middle_left" },
    { ...texts.left1, anchor: "middle_left" },
    { ...texts.left3, anchor: "middle_left" },
    { ...texts.right1, anchor: "middle_left" },
    { ...texts.left2, anchor: "middle_right" },
    { ...texts.left4, anchor: "middle_right" },
    { ...texts.left5, anchor: "middle_right" },
    { ...texts.right2, anchor: "middle_right" },
    { ...texts.right3, anchor: "middle_right" },
    { ...texts.right4, anchor: "middle_right" },
  ] as Primitive[],
  ports: [
    { ...refblocks.left1, labels: ["1", "{PIN1_NAME}"] },
    { ...refblocks.left2, labels: ["2", "{PIN2_NAME}"] },
    { ...refblocks.left3, labels: ["3", "{PIN3_NAME}"] },
    { ...refblocks.right1, labels: ["4", "{PIN4_NAME}"] },
    { ...refblocks.right2, labels: ["5", "{PIN5_NAME}"] },
    { ...refblocks.right3, labels: ["6", "{PIN6_NAME}"] },
  ],
  size: { width: bounds.width * 2, height: bounds.height * 2 },
  center: { x: bounds.centerX, y: bounds.centerY },
})
