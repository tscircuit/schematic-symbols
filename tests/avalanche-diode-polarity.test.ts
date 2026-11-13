import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("avalanche diode pos/anode is on the triangle side and neg/cathode on the bar side", () => {
  for (const [symbolName, direction] of [
    ["avalanche_diode_right", "right"],
    ["avalanche_diode_horz", "right"],
    ["avalanche_diode_left", "left"],
    ["avalanche_diode_up", "up"],
    ["avalanche_diode_down", "down"],
  ] as const) {
    const symbol = symbols[symbolName]
    const anode = symbol.ports.find((port) => port.labels.includes("pos"))
    const cathode = symbol.ports.find((port) => port.labels.includes("neg"))
    expect(anode, symbolName).toBeDefined()
    expect(cathode, symbolName).toBeDefined()
    expect(anode!.labels, symbolName).toEqual(["1", "pos", "anode"])
    expect(cathode!.labels, symbolName).toEqual(["2", "neg", "cathode"])

    // The cathode bar is on the side named by the symbol's direction.
    const delta =
      direction === "right" || direction === "left"
        ? cathode!.x - anode!.x
        : cathode!.y - anode!.y
    expect(Math.sign(delta), symbolName).toBe(
      direction === "right" || direction === "up" ? 1 : -1,
    )
  }
})

test("avalanche_diode_right neg port is on the side the triangle points to", () => {
  const symbol = symbols.avalanche_diode_right
  const axisY = symbol.ports[0].y
  // The triangle tip is where its slanted edges meet the lead axis; the
  // cathode bar is drawn there.
  const tipXs = symbol.primitives.flatMap((p) => {
    if (p.type !== "path" || p.points.length !== 2) return []
    const [a, b] = p.points
    const isSlanted = Math.abs(a.x - b.x) > 1e-6 && Math.abs(a.y - b.y) > 1e-6
    if (!isSlanted) return []
    return [a, b]
      .filter((pt) => Math.abs(pt.y - axisY) < 1e-6)
      .map((pt) => pt.x)
  })
  expect(tipXs.length).toBeGreaterThan(0)
  const tipSide = Math.sign(tipXs[0] - symbol.center.x)

  const neg = symbol.ports.find((port) => port.labels.includes("neg"))!
  const pos = symbol.ports.find((port) => port.labels.includes("pos"))!
  expect(Math.sign(neg.x - symbol.center.x)).toBe(tipSide)
  expect(Math.sign(pos.x - symbol.center.x)).toBe(-tipSide)
})
