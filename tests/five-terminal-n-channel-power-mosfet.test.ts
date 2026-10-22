import { expect, test } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { Point, SchSymbol } from "../drawing/types"
import symbols from "../generated/symbols-index"

const symbolNames = [
  "n_channel_power_mosfet_5_pin_horz",
  "n_channel_power_mosfet_5_pin_vert",
  "n_channel_power_mosfet_5_pin_gate_left_drain_top",
  "n_channel_power_mosfet_5_pin_gate_left_drain_bottom",
  "n_channel_power_mosfet_5_pin_gate_right_drain_top",
  "n_channel_power_mosfet_5_pin_gate_right_drain_bottom",
  "n_channel_power_mosfet_5_pin_gate_top_drain_left",
  "n_channel_power_mosfet_5_pin_gate_top_drain_right",
  "n_channel_power_mosfet_5_pin_gate_bottom_drain_left",
  "n_channel_power_mosfet_5_pin_gate_bottom_drain_right",
] as const

const expectedPinNumberByAlias = {
  gate: "1",
  source_left: "2",
  source_center: "3",
  source_right: "4",
  drain: "5",
} as const

const pointTouchesPort = ({
  point,
  port,
}: {
  point: Point
  port: Point
}): boolean => Math.hypot(point.x - port.x, point.y - port.y) < 0.000001

const expectEveryPortToTouchArtwork = ({
  symbol,
  symbolName,
}: {
  symbol: SchSymbol
  symbolName: string
}): void => {
  const pathPoints = symbol.primitives.flatMap((primitive) =>
    primitive.type === "path" ? primitive.points : [],
  )
  for (const port of symbol.ports) {
    expect(
      pathPoints.some((point) => pointTouchesPort({ point, port })),
      `${symbolName} has a disconnected ${port.labels[0]} port`,
    ).toBe(true)
  }
}

const expectReferenceAboveValue = ({
  symbol,
  symbolName,
}: {
  symbol: SchSymbol
  symbolName: string
}): void => {
  const reference = symbol.primitives.find(
    (primitive) => primitive.type === "text" && primitive.text === "{REF}",
  )
  const displayValue = symbol.primitives.find(
    (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
  )
  expect(reference?.type, symbolName).toBe("text")
  expect(displayValue?.type, symbolName).toBe("text")
  if (reference?.type === "text" && displayValue?.type === "text") {
    expect(reference.y, symbolName).toBeGreaterThan(displayValue.y)
  }
}

test("all generated power MOSFET variants preserve five connected terminals", () => {
  for (const symbolName of symbolNames) {
    const symbol = symbols[symbolName]
    expect(symbol.ports, symbolName).toHaveLength(5)
    for (const [alias, expectedPinNumber] of Object.entries(
      expectedPinNumberByAlias,
    )) {
      const port = symbol.ports.find((port) => port.labels.includes(alias))
      expect(port, `${symbolName} is missing ${alias}`).toBeDefined()
      expect(
        port?.labels,
        `${symbolName} changed ${alias}'s pin number`,
      ).toContain(expectedPinNumber)
    }
    expectEveryPortToTouchArtwork({ symbol, symbolName })
    expectReferenceAboveValue({ symbol, symbolName })
  }
})

test("source drawing contains one body and a closed body diode", () => {
  const symbol = symbols.n_channel_power_mosfet_5_pin_horz
  expect(
    symbol.primitives.filter((primitive) => primitive.type === "circle"),
  ).toHaveLength(1)

  const bodyDiode = symbol.primitives.find(
    (primitive) =>
      primitive.type === "path" &&
      !primitive.fill &&
      primitive.points.length === 4 &&
      pointTouchesPort({
        point: primitive.points[0],
        port: primitive.points[primitive.points.length - 1],
      }),
  )
  expect(bodyDiode).toBeDefined()
})

test("right-gate artwork mirrors the left-gate SVG-generated artwork", () => {
  const leftGate = symbols.n_channel_power_mosfet_5_pin_gate_left_drain_top
  const rightGate = symbols.n_channel_power_mosfet_5_pin_gate_right_drain_top
  const mirroredLeftGate = flipSymbolOverYAxis(leftGate)
  const withoutText = (symbol: SchSymbol) =>
    symbol.primitives.filter((primitive) => primitive.type !== "text")

  expect(withoutText(rightGate)).toEqual(withoutText(mirroredLeftGate))
})
