import { NinePointAnchor, SchSymbol } from "drawing/types"
import { rotateRightFacingSymbol } from "drawing/rotateSymbol"
import { getBoundsOfPrimitives } from "drawing/utils/getBoundsOfPrimitives"

interface ModifySymbolBuilder {
  changeTextAnchor(
    text: "{REF}" | "{VAL}" | string,
    newAnchor: NinePointAnchor,
    anchorPosition?: { x: number; y: number },
  ): ModifySymbolBuilder
  rotateRightFacingSymbol(
    newOrientation: "up" | "down" | "left" | "right",
  ): ModifySymbolBuilder
  labelPort(currentLabel: string, newLabels: string[]): ModifySymbolBuilder
  build(): SchSymbol
}

class SymbolModifier implements ModifySymbolBuilder {
  private symbol: SchSymbol

  constructor(symbol: SchSymbol) {
    this.symbol = JSON.parse(JSON.stringify(symbol))
    this.symbol.size = this.computeSize()
  }

  changeTextAnchor(
    text: "{REF}" | "{VAL}" | string,
    newAnchor: NinePointAnchor,
    anchorPosition?: { x: number; y: number },
  ): ModifySymbolBuilder {
    this.symbol = {
      ...this.symbol,
      primitives: this.symbol.primitives.map((primitive) => {
        if (primitive.type === "text" && primitive.text === text) {
          return {
            ...primitive,
            anchor: newAnchor,
            ...(anchorPosition
              ? {
                  x: primitive.x + anchorPosition.x,
                  y: primitive.y + anchorPosition.y,
                }
              : {}),
          }
        }
        return primitive
      }),
    }
    return this
  }

  labelPort(currentLabel: string, newLabels: string[]): ModifySymbolBuilder {
    this.symbol = {
      ...this.symbol,
      ports: this.symbol.ports.map((port) => {
        return port.labels.includes(currentLabel)
          ? { ...port, labels: newLabels }
          : port
      }),
    }
    return this
  }

  rotateRightFacingSymbol(
    newOrientation: "up" | "down" | "left" | "right",
  ): ModifySymbolBuilder {
    this.symbol = rotateRightFacingSymbol(this.symbol, {
      newOrientation,
    })
    return this
  }

  computeSize(): { width: number; height: number } {
    const bounds = getBoundsOfPrimitives(this.symbol.primitives)
    return {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    }
  }

  build(): SchSymbol {
    return { ...this.symbol, size: this.computeSize() }
  }
}

export const modifySymbol = (symbol: any): ModifySymbolBuilder => {
  const primitives = symbol.primitives ?? [
    ...Object.values(symbol.paths ?? {}),
    ...Object.values(symbol.texts ?? {}),
    ...Object.values(symbol.circles ?? {}),
    ...Object.values(symbol.rects ?? {}),
  ]

  const ports =
    symbol.ports ??
    Object.entries(symbol.refblocks).flatMap(([key, refblock]) => {
      return [{ ...(refblock as object), labels: [key] }]
    })

  let center = symbol.center ?? {
    x: symbol.bounds.centerX,
    y: symbol.bounds.centerY,
  }

  if (ports.length === 2) {
    center = {
      x: (ports[0].x + ports[1].x) / 2,
      y: (ports[0].y + ports[1].y) / 2,
    }
  }

  return new SymbolModifier({
    ...symbol,
    primitives,
    ports,
    center,
  })
}
