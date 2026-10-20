import svgJson from "assets/generated/four_terminal_capacitor.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import type { NinePointAnchor, Point, SchSymbol } from "drawing/types"

type SymbolOrientation = "right" | "up" | "down"

interface LabelLayout {
  reference: Point
  value: Point
  referenceAnchor: NinePointAnchor
  valueAnchor: NinePointAnchor
  size: { width: number; height: number }
}

const labelLayouts: Record<SymbolOrientation, LabelLayout> = {
  right: {
    reference: { x: 0, y: 0.56 },
    value: { x: 0, y: -0.56 },
    referenceAnchor: "middle_bottom",
    valueAnchor: "middle_top",
    size: { width: 1.4, height: 1.2 },
  },
  up: {
    reference: { x: 0.12, y: -0.5 },
    value: { x: -0.12, y: -0.5 },
    referenceAnchor: "middle_top",
    valueAnchor: "middle_top",
    size: { width: 1.5, height: 1.4 },
  },
  down: {
    reference: { x: -0.12, y: 0.5 },
    value: { x: 0.12, y: 0.5 },
    referenceAnchor: "middle_bottom",
    valueAnchor: "middle_bottom",
    size: { width: 1.5, height: 1.4 },
  },
}

export const createFourTerminalCapacitor = (
  orientation: SymbolOrientation,
): SchSymbol => {
  const labelLayout = labelLayouts[orientation]

  const symbol = modifySymbol({
    ...svgJson,
    texts: {
      ...svgJson.texts,
      top1: { ...svgJson.texts.top1, ...labelLayout.reference },
      bottom1: { ...svgJson.texts.bottom1, ...labelLayout.value },
    },
  })
    .labelPort("left1", ["1", "plate1_terminal1"])
    .labelPort("left2", ["2", "plate1_terminal2"])
    .labelPort("right1", ["4", "plate2_terminal2"])
    .labelPort("right2", ["3", "plate2_terminal1"])
    .changeTextAnchor("{REF}", labelLayout.referenceAnchor)
    .changeTextAnchor("{VAL}", labelLayout.valueAnchor)
    .rotateRightFacingSymbol(orientation)
    .build()

  return { ...symbol, size: labelLayout.size }
}
