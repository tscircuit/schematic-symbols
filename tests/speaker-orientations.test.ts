import { expect, test } from "bun:test"
import type { SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const getPort = (symbol: SchSymbol, label: string) =>
  symbol.ports.find((port) => port.labels.includes(label))!

test("speaker uses a compact grid-aligned envelope", () => {
  expect(symbols.speaker_right.size.width).toBeCloseTo(1.6)
  expect(symbols.speaker_right.size.height).toBeCloseTo(1.2)
  expect(symbols.speaker_up.size.width).toBeCloseTo(1.2)
  expect(symbols.speaker_up.size.height).toBeCloseTo(1.6)

  const positivePort = getPort(symbols.speaker_right, "pos")
  const negativePort = getPort(symbols.speaker_right, "neg")
  expect(positivePort.x).toBeCloseTo(-0.8)
  expect(positivePort.y).toBeCloseTo(0.2)
  expect(negativePort.x).toBeCloseTo(-0.8)
  expect(negativePort.y).toBeCloseTo(-0.2)
})

test("speaker variants preserve terminal polarity", () => {
  for (const name of [
    "speaker_right",
    "speaker_left",
    "speaker_up",
    "speaker_down",
    "speaker_horz",
    "speaker_vert",
  ] as const) {
    const symbol = symbols[name]

    expect(getPort(symbol, "pos").labels).toContain("1")
    expect(getPort(symbol, "neg").labels).toContain("2")
  }
})

test("speaker ports remain connected to their leads", () => {
  for (const name of [
    "speaker_right",
    "speaker_left",
    "speaker_up",
    "speaker_down",
    "speaker_horz",
    "speaker_vert",
  ] as const) {
    const symbol = symbols[name]
    const pathPoints = symbol.primitives.flatMap((primitive) =>
      primitive.type === "path" ? primitive.points : [],
    )

    for (const port of symbol.ports) {
      expect(
        pathPoints.some(
          (point) =>
            Math.abs(point.x - port.x) < Number.EPSILON &&
            Math.abs(point.y - port.y) < Number.EPSILON,
        ),
      ).toBe(true)
    }
  }
})
