import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"
import type { SchSymbol } from "../drawing/types"

type SymbolSide = "left" | "right" | "top" | "bottom"

const getPortSide = (
  symbol: SchSymbol,
  portLabel: "gate" | "drain" | "source",
): SymbolSide => {
  const port = symbol.ports.find(({ labels }) => labels.includes(portLabel))!
  const dx = port.x - symbol.center.x
  const dy = port.y - symbol.center.y
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? "left" : "right"
  return dy < 0 ? "bottom" : "top"
}

test("MOSFET variants place gate, drain, and source on named sides", () => {
  const families = [
    "n_channel_d_mosfet_transistor",
    "n_channel_e_mosfet_transistor",
    "p_channel_d_mosfet_transistor",
    "p_channel_e_mosfet_transistor",
  ] as const
  const orientations = [
    ["left", "top", "bottom"],
    ["left", "bottom", "top"],
    ["right", "top", "bottom"],
    ["right", "bottom", "top"],
    ["top", "left", "right"],
    ["top", "right", "left"],
    ["bottom", "left", "right"],
    ["bottom", "right", "left"],
  ] as const

  for (const family of families) {
    for (const [gateSide, drainSide, sourceSide] of orientations) {
      const symbolName = `${family}_gate_${gateSide}_drain_${drainSide}`
      const symbol = symbols[symbolName as keyof typeof symbols]

      expect(symbol, symbolName).toBeDefined()
      expect(getPortSide(symbol, "gate"), symbolName).toBe(gateSide)
      expect(getPortSide(symbol, "drain"), symbolName).toBe(drainSide)
      expect(getPortSide(symbol, "source"), symbolName).toBe(sourceSide)
    }
  }
})
