import { expect, test } from "bun:test"
import type { Point, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const pointTouchesPort = ({
  point,
  port,
}: {
  point: Point
  port: Point
}): boolean => Math.hypot(point.x - port.x, point.y - port.y) < 0.000001

const expectEveryPortToTouchArtwork = (symbol: SchSymbol): void => {
  const pathPoints = symbol.primitives.flatMap((primitive) =>
    primitive.type === "path" ? primitive.points : [],
  )

  for (const port of symbol.ports) {
    expect(pathPoints.some((point) => pointTouchesPort({ point, port }))).toBe(
      true,
    )
  }
}

test("generated OR gate assets expose connected semantic ports", () => {
  const symbolNames = [
    "or_gate_right",
    "or_gate_up",
    "or_gate_left",
    "or_gate_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    expect(symbol.ports).toHaveLength(3)
    expect(symbol.ports.find((port) => port.labels.includes("a"))).toBeDefined()
    expect(symbol.ports.find((port) => port.labels.includes("b"))).toBeDefined()
    expect(symbol.ports.find((port) => port.labels.includes("y"))).toBeDefined()
    expectEveryPortToTouchArtwork(symbol)
  }
})

test("generated powered OR gate assets include signal and supply ports", () => {
  const symbolNames = [
    "or_gate_with_power_right",
    "or_gate_with_power_up",
    "or_gate_with_power_left",
    "or_gate_with_power_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    expect(symbol.ports).toHaveLength(5)
    for (const alias of ["a", "b", "y", "vcc", "gnd"]) {
      expect(
        symbol.ports.find((port) => port.labels.includes(alias)),
        `${symbolName} is missing ${alias}`,
      ).toBeDefined()
    }
    expectEveryPortToTouchArtwork(symbol)
  }
})

test("left-facing generated OR gates mirror the right-facing assets", () => {
  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.or_gate_right,
    leftFacingSymbol: symbols.or_gate_left,
  })
  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.or_gate_with_power_right,
    leftFacingSymbol: symbols.or_gate_with_power_left,
  })
})

test("vertical OR gate labels stay together on the right", () => {
  const symbolNames = [
    "or_gate_up",
    "or_gate_down",
    "or_gate_with_power_up",
    "or_gate_with_power_down",
  ] as const

  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    const reference = symbol.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{REF}",
    )
    const displayValue = symbol.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
    )

    expect(reference?.type, symbolName).toBe("text")
    expect(displayValue?.type, symbolName).toBe("text")
    if (reference?.type !== "text" || displayValue?.type !== "text") continue

    expect(reference.x, symbolName).toBe(displayValue.x)
    expect(reference.y, symbolName).toBeGreaterThan(displayValue.y)
    expect(reference.anchor, symbolName).toBe("middle_left")
    expect(displayValue.anchor, symbolName).toBe("middle_left")
  }
})
