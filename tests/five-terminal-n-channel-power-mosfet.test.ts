import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import baseMosfet from "../symbols/n_channel_e_mosfet_transistor_horz"
import fiveTerminalMosfet from "../symbols/n_channel_power_mosfet_5_pin_horz"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

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

test("three source identities share a compact manufacturer-style terminal", () => {
  const baseGate = baseMosfet.ports.find((port) => port.labels.includes("gate"))
  const baseDrain = baseMosfet.ports.find((port) =>
    port.labels.includes("drain"),
  )
  const baseSource = baseMosfet.ports.find((port) =>
    port.labels.includes("source"),
  )
  const gate = fiveTerminalMosfet.ports.find((port) =>
    port.labels.includes("gate"),
  )
  const drain = fiveTerminalMosfet.ports.find((port) =>
    port.labels.includes("drain"),
  )
  const sources = fiveTerminalMosfet.ports.filter((port) =>
    port.labels.includes("source"),
  )

  expect(gate).toMatchObject({ x: baseGate?.x, y: baseGate?.y })
  expect(drain).toMatchObject({ x: baseDrain?.x, y: baseDrain?.y })
  expect(baseSource).toBeDefined()
  if (!baseSource) return
  expect(sources.map((source) => source.x)).toEqual([
    baseSource.x - 0.15,
    baseSource.x,
    baseSource.x + 0.15,
  ])
  expect(sources.every((source) => source.y === baseSource.y)).toBe(true)
})

test("five-terminal power MOSFET variants preserve gate, drain, and three source terminals", () => {
  for (const symbolName of VARIANT_NAMES) {
    const mosfet = symbols[symbolName]
    const gate = mosfet.ports.find((port) => port.labels.includes("gate"))
    const drain = mosfet.ports.find((port) => port.labels.includes("drain"))
    const sources = mosfet.ports.filter((port) =>
      port.labels.includes("source"),
    )

    expect(gate?.labels, symbolName).toContain("4")
    expect(drain?.labels, symbolName).toContain("5")
    expect(sources, symbolName).toHaveLength(3)
    expect(
      sources.map((source) => source.labels[0]).sort(),
      symbolName,
    ).toEqual(["1", "2", "3"])

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

  expectSymbolToBeYAxisMirror({
    rightFacingSymbol: symbols.n_channel_power_mosfet_5_pin_gate_left_drain_top,
    leftFacingSymbol: symbols.n_channel_power_mosfet_5_pin_gate_right_drain_top,
  })
})
