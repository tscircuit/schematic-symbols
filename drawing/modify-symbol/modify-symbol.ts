import { NinePointAnchor, SchSymbol } from "drawing/types"
import { rotateRightFacingSymbol } from "drawing/rotateSymbol"

interface ModifySymbolBuilder {
  changeTextAnchor(
    text: "{REF}" | "{VAL}" | string,
    newAnchor: NinePointAnchor,
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
  }

  changeTextAnchor(
    text: "{REF}" | "{VAL}" | string,
    newAnchor: NinePointAnchor,
  ): ModifySymbolBuilder {
    this.symbol = {
      ...this.symbol,
      primitives: this.symbol.primitives.map((primitive) => {
        if (primitive.type === "text" && primitive.text === text) {
          return {
            ...primitive,
            anchor: newAnchor,
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

  build(): SchSymbol {
    return this.symbol
  }
}

export const modifySymbol = (symbol: any): ModifySymbolBuilder => {
  return new SymbolModifier({
    ...symbol,
    primitives: symbol.primitives ?? [
      ...Object.values(symbol.paths ?? {}),
      ...Object.values(symbol.texts ?? {}),
      ...Object.values(symbol.circles ?? {}),
      ...Object.values(symbol.rects ?? {}),
    ],
    ports:
      symbol.ports ??
      Object.entries(symbol.refblocks).flatMap(([key, refblock]) => {
        return [{ ...(refblock as object), labels: [key] }]
      }),
    center: symbol.center ?? {
      x: symbol.bounds.centerX,
      y: symbol.bounds.centerY,
    },
    size: symbol.size ?? {
      width: symbol.bounds.width,
      height: symbol.bounds.height,
    },
  })
}
