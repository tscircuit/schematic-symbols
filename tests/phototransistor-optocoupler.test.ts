import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

test("phototransistor optocoupler orientations preserve terminal aliases", () => {
  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("phototransistor_optocoupler_" +
      orientation) as keyof typeof symbols
    const optocoupler = symbols[symbolName]
    const expectedTerminals = [
      ["anode", "1"],
      ["cathode", "2"],
      ["emitter", "3"],
      ["collector", "4"],
    ] as const

    for (const [terminalAlias, terminalNumber] of expectedTerminals) {
      const terminal = optocoupler.ports.find((port) =>
        port.labels.includes(terminalAlias),
      )
      const assertionLabel = symbolName + " " + terminalAlias
      expect(terminal, assertionLabel).toBeDefined()
      expect(terminal?.labels, assertionLabel).toContain(terminalNumber)
    }
  }
})
