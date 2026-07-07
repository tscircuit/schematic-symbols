import { defineSymbol } from "drawing/defineSymbol"
import { getSizeForCenteredTerminalBox } from "drawing/getSizeForCenteredTerminalBox"
import svgJson from "assets/generated/n_channel_e_mosfet_transistor.json"
import { Primitive } from "drawing/types"

const { paths, texts, bounds, refblocks, circles } = svgJson
const center = { x: bounds.centerX, y: bounds.centerY }

export default defineSymbol({
  primitives: [
    ...Object.values(paths),
    ...Object.values(circles),
    { ...texts.top1, anchor: "middle_right", x: 0 },
    { ...texts.bottom1, anchor: "middle_right", x: 0 },
  ] as Primitive[],
  ports: [
    { ...refblocks.top1, labels: ["1", "drain"] }, // TODO add more "standard" labels
    { ...refblocks.bottom1, labels: ["2", "source"] }, // TODO add more "standard" labels
    { ...refblocks.left1, labels: ["3", "gate"] }, // TODO add more "standard" labels
  ],
  size: getSizeForCenteredTerminalBox(center, [
    refblocks.top1,
    refblocks.bottom1,
    refblocks.left1,
  ]),
  center,
})
