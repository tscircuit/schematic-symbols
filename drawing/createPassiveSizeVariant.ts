import { modifySymbol } from "./modify-symbol/modify-symbol"
import type { SchSymbol, TextPrimitive } from "./types"

type PassiveKind = "boxresistor" | "capacitor" | "resistor"
type Orientation = "right" | "left" | "up" | "down"

interface CreatePassiveSizeVariantOptions {
  kind: PassiveKind
  orientation: Orientation
  pin1Labels?: string[]
  pin2Labels?: string[]
}

const annotationLayouts: Record<
  PassiveKind,
  {
    horizontalOffset: number
    horizontalHeight: number
    verticalX: number
    verticalRefY: number
    verticalValY: number
    verticalWidth: number
  }
> = {
  boxresistor: {
    horizontalOffset: 0.16,
    horizontalHeight: 0.65,
    verticalX: 0.16,
    verticalRefY: 0.16,
    verticalValY: -0.16,
    verticalWidth: 0.9,
  },
  capacitor: {
    horizontalOffset: 0.24,
    horizontalHeight: 0.65,
    verticalX: 0.2,
    verticalRefY: 0.095,
    verticalValY: -0.095,
    verticalWidth: 0.9,
  },
  resistor: {
    horizontalOffset: 0.22,
    horizontalHeight: 0.65,
    verticalX: 0.2,
    verticalRefY: 0.14,
    verticalValY: -0.14,
    verticalWidth: 0.9,
  },
}

/**
 * Builds compact passive variants while keeping annotations readable instead
 * of scaling them with the electrical geometry.
 */
export const createPassiveSizeVariant = (
  svgJson: any,
  {
    kind,
    orientation,
    pin1Labels = ["1"],
    pin2Labels = ["2"],
  }: CreatePassiveSizeVariantOptions,
): SchSymbol => {
  const layout = annotationLayouts[kind]
  const symbol = modifySymbol({ ...svgJson, texts: {} })
    .rotateRightFacingSymbol(orientation)
    .labelPort("left1", pin1Labels)
    .labelPort("right1", pin2Labels)
    .build()

  const isHorizontal = orientation === "right" || orientation === "left"
  const annotations: TextPrimitive[] = isHorizontal
    ? [
        {
          type: "text",
          text: "{REF}",
          x: 0,
          y: layout.horizontalOffset,
          anchor: "middle_bottom",
        },
        {
          type: "text",
          text: "{VAL}",
          x: 0,
          y: -layout.horizontalOffset,
          anchor: "middle_top",
        },
      ]
    : [
        {
          type: "text",
          text: "{REF}",
          x: layout.verticalX,
          y: layout.verticalRefY,
          anchor: "middle_left",
        },
        {
          type: "text",
          text: "{VAL}",
          x: layout.verticalX,
          y: layout.verticalValY,
          anchor: "middle_left",
        },
      ]

  const [port1, port2] = symbol.ports
  const terminalSpan = Math.hypot(port2.x - port1.x, port2.y - port1.y)

  return {
    ...symbol,
    primitives: [...symbol.primitives, ...annotations],
    size: isHorizontal
      ? { width: terminalSpan, height: layout.horizontalHeight }
      : { width: layout.verticalWidth, height: terminalSpan },
  }
}
