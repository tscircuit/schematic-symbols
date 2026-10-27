import { expect, test } from "bun:test"
import crystal4PinDown from "../symbols/crystal_4pin_down"
import crystal4PinLeft from "../symbols/crystal_4pin_left"
import crystal4PinRight from "../symbols/crystal_4pin_right"
import crystal4PinUp from "../symbols/crystal_4pin_up"

const orientations = {
  crystal_4pin_down: crystal4PinDown,
  crystal_4pin_left: crystal4PinLeft,
  crystal_4pin_right: crystal4PinRight,
  crystal_4pin_up: crystal4PinUp,
}

test("four-pin crystal orientations preserve oscillator and case pin identities", () => {
  for (const [symbolName, symbol] of Object.entries(orientations)) {
    expect(symbol.ports, symbolName).toHaveLength(4)

    const pin1 = symbol.ports.find((port) => port.labels.includes("1"))
    const pin2 = symbol.ports.find((port) => port.labels.includes("2"))
    const pin3 = symbol.ports.find((port) => port.labels.includes("3"))
    const pin4 = symbol.ports.find((port) => port.labels.includes("4"))

    expect(pin1, `${symbolName} pin 1`).toBeDefined()
    expect(pin2?.labels, `${symbolName} pin 2`).toContain("gnd2")
    expect(pin3, `${symbolName} pin 3`).toBeDefined()
    expect(pin4?.labels, `${symbolName} pin 4`).toContain("gnd1")
    expect(pin1?.labels, `${symbolName} pin 1`).not.toContain("gnd1")
    expect(pin1?.labels, `${symbolName} pin 1`).not.toContain("gnd2")
    expect(pin3?.labels, `${symbolName} pin 3`).not.toContain("gnd1")
    expect(pin3?.labels, `${symbolName} pin 3`).not.toContain("gnd2")
  }
})
