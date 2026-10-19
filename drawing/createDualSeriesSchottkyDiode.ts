import svgJson from "assets/generated/dual_series_schottky_diode.json"
import { modifySymbol } from "drawing/modify-symbol/modify-symbol"
import type { Point, SchSymbol } from "drawing/types"

type SymbolOrientation = "right" | "up" | "down"

interface LabelLayout {
  reference: Point
  value: Point
}

const labelLayouts: Record<SymbolOrientation, LabelLayout> = {
  right: {
    reference: { x: 0, y: 0.34 },
    value: { x: 0, y: -0.34 },
  },
  up: {
    reference: { x: 0.17, y: -0.34 },
    value: { x: -0.17, y: -0.34 },
  },
  down: {
    reference: { x: -0.17, y: 0.34 },
    value: { x: 0.17, y: 0.34 },
  },
}

export const createDualSeriesSchottkyDiode = (
  orientation: SymbolOrientation,
): SchSymbol => {
  const labelLayout = labelLayouts[orientation]
  const isVertical = orientation === "up" || orientation === "down"

  return modifySymbol({
    ...svgJson,
    texts: {
      ...svgJson.texts,
      top1: { ...svgJson.texts.top1, ...labelLayout.reference },
      bottom1: { ...svgJson.texts.bottom1, ...labelLayout.value },
    },
  })
    .labelPort("left1", ["1", "anode"])
    .labelPort("bottom1", ["2", "junction", "common"])
    .labelPort("right1", ["3", "cathode"])
    .rotateRightFacingSymbol(orientation)
    .changeTextAnchor("{REF}", isVertical ? "middle_left" : "middle_bottom")
    .changeTextAnchor("{VAL}", isVertical ? "middle_left" : "middle_top")
    .build()
}
