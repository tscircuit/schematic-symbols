import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("push button terminals pass through the symbol center", () => {
  const horizontalSymbols = [
    symbols.push_button_normally_open_momentary_horz,
    symbols.push_button_normally_open_momentary_left,
    symbols.push_button_normally_open_momentary_right,
  ]

  for (const symbol of horizontalSymbols) {
    for (const port of symbol.ports) {
      expect(port.y).toBeCloseTo(symbol.center.y)
    }
  }

  const verticalSymbols = [
    symbols.push_button_normally_open_momentary_vert,
    symbols.push_button_normally_open_momentary_up,
    symbols.push_button_normally_open_momentary_down,
  ]

  for (const symbol of verticalSymbols) {
    for (const port of symbol.ports) {
      expect(port.x).toBeCloseTo(symbol.center.x)
    }
  }
})
