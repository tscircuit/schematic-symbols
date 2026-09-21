import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("LED, laser diode, and diode symbols preserve polarity labels in every orientation", () => {
  for (const family of ["led", "laser_diode", "diode"] as const) {
    for (const direction of ["right", "up", "left", "down"] as const) {
      const symbolName = `${family}_${direction}` as const
      const symbol = symbols[symbolName]
      const anode = symbol.ports.find((port) => port.labels.includes("anode"))!
      const cathode = symbol.ports.find((port) =>
        port.labels.includes("cathode"),
      )!
      expect(anode, symbolName).toBeDefined()
      expect(cathode, symbolName).toBeDefined()
      expect(anode.labels).toContain("1")
      expect(anode.labels).toContain("pos")
      expect(cathode.labels).toContain("2")
      expect(cathode.labels).toContain("neg")
      expect(anode.labels).not.toContain("cathode")
      expect(cathode.labels).not.toContain("anode")

      // Symbol-local coordinates are mm, +X right and +Y up. The bar is
      // on the side named by the symbol's direction.
      const delta =
        direction === "right" || direction === "left"
          ? cathode.x - anode.x
          : cathode.y - anode.y
      expect(Math.sign(delta), symbolName).toBe(
        direction === "right" || direction === "up" ? 1 : -1,
      )
    }
  }
})
