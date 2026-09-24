import { describe, expect, test } from "bun:test"
import opampInvertedInputsRight from "../symbols/opamp_with_power_inverted_inputs_right"

const getPort = (label: string) => {
  const port = opampInvertedInputsRight.ports.find((port) =>
    port.labels.includes(label),
  )

  if (!port) throw new Error(`Missing ${label} port`)
  return port
}

describe("opamp with inverted input placement", () => {
  test("places the inverting input above the non-inverting input", () => {
    expect(getPort("inp2").y).toBeGreaterThan(getPort("inp1").y)
  })

  test("keeps the positive supply above the negative supply", () => {
    expect(getPort("V+").y).toBeGreaterThan(getPort("V-").y)
  })
})
