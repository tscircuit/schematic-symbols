import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import fiveTerminalMosfet from "../symbols/n_channel_power_mosfet_5_pin_horz"
import { expectPortsNumberedCounterClockwise } from "./helpers/expect-ports-numbered-counter-clockwise"
import { expectReferenceAboveValue } from "./helpers/expect-reference-above-value"
import { expectSymbolGeometryToBeYAxisMirror } from "./helpers/expect-symbol-geometry-to-be-y-axis-mirror"

const VARIANT_NAMES = [
  "n_channel_power_mosfet_5_pin_gate_left_drain_top",
  "n_channel_power_mosfet_5_pin_gate_left_drain_bottom",
  "n_channel_power_mosfet_5_pin_gate_right_drain_top",
  "n_channel_power_mosfet_5_pin_gate_right_drain_bottom",
  "n_channel_power_mosfet_5_pin_gate_top_drain_left",
  "n_channel_power_mosfet_5_pin_gate_top_drain_right",
  "n_channel_power_mosfet_5_pin_gate_bottom_drain_left",
  "n_channel_power_mosfet_5_pin_gate_bottom_drain_right",
] as const

test("three source package leads emerge from one shared source bus", () => {
  const gate = fiveTerminalMosfet.ports.find((port) =>
    port.labels.includes("gate"),
  )
  const drain = fiveTerminalMosfet.ports.find((port) =>
    port.labels.includes("drain"),
  )
  const sources = fiveTerminalMosfet.ports.filter((port) =>
    port.labels.includes("source"),
  )

  expect(gate).toMatchObject({ x: -0.29, y: -0.1 })
  expect(drain).toMatchObject({ x: 0.31, y: 0.5 })
  expect(sources).toHaveLength(3)
  expect(sources.map(({ x, y }) => ({ x, y }))).toEqual([
    { x: 0.16, y: -0.55 },
    { x: 0.31, y: -0.55 },
    { x: 0.46, y: -0.55 },
  ])

  const sourceBus = fiveTerminalMosfet.primitives.find(
    (primitive) =>
      primitive.type === "path" &&
      primitive.points.length === 2 &&
      primitive.points.every((point) => point.y === -0.32),
  )
  expect(sourceBus).toBeDefined()
})

test("five-terminal power MOSFET variants preserve gate, drain, and three source terminals", () => {
  for (const symbolName of VARIANT_NAMES) {
    const mosfet = symbols[symbolName]
    const gate = mosfet.ports.find((port) => port.labels.includes("gate"))
    const drain = mosfet.ports.find((port) => port.labels.includes("drain"))
    const sources = mosfet.ports.filter((port) =>
      port.labels.includes("source"),
    )

    expect(gate?.labels, symbolName).toContain("1")
    expect(drain, symbolName).toBeDefined()
    expect(sources, symbolName).toHaveLength(3)
    expect(
      sources.flatMap((source) => source.labels),
      symbolName,
    ).toEqual(
      expect.arrayContaining(["source_left", "source_center", "source_right"]),
    )
    expectPortsNumberedCounterClockwise({ symbol: mosfet, symbolName })
    expectReferenceAboveValue({ symbol: mosfet, symbolName })

    for (const port of mosfet.ports) {
      expect(
        mosfet.primitives.some(
          (primitive) =>
            primitive.type === "path" &&
            primitive.points.some(
              (point) =>
                Math.hypot(point.x - port.x, point.y - port.y) < 0.000001,
            ),
        ),
        symbolName + " connected port " + port.labels[0],
      ).toBe(true)
    }
  }

  expectSymbolGeometryToBeYAxisMirror({
    rightFacingSymbol: symbols.n_channel_power_mosfet_5_pin_gate_left_drain_top,
    leftFacingSymbol: symbols.n_channel_power_mosfet_5_pin_gate_right_drain_top,
    ignoreTextLayout: true,
  })
})

test("vertical five-terminal MOSFET labels keep reference above value", () => {
  for (const symbolName of VARIANT_NAMES.filter(
    (name) => name.includes("gate_top") || name.includes("gate_bottom"),
  )) {
    const mosfet = symbols[symbolName]
    expectReferenceAboveValue({ symbol: mosfet, symbolName })
    const reference = mosfet.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{REF}",
    )
    const value = mosfet.primitives.find(
      (primitive) => primitive.type === "text" && primitive.text === "{VAL}",
    )
    const hasDrainOnLeft = symbolName.includes("drain_left")
    const expectedTextLayout = hasDrainOnLeft
      ? { x: -0.35, anchor: "middle_right" }
      : { x: 0.35, anchor: "middle_left" }
    expect(reference).toMatchObject(expectedTextLayout)
    expect(value).toMatchObject(expectedTextLayout)
  }
})
