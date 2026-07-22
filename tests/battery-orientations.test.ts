import { expect, test } from "bun:test"
import symbols from "../generated/symbols-index"

const getPort = (
  symbol: (typeof symbols)[keyof typeof symbols],
  label: string,
) => symbol.ports.find((port) => port.labels.includes(label))!

test("battery directional variants preserve terminal orientation", () => {
  const rightPort1 = getPort(symbols.battery_right, "1")
  const rightPort2 = getPort(symbols.battery_right, "2")
  expect(rightPort1.x).toBeLessThan(rightPort2.x)

  const leftPort1 = getPort(symbols.battery_left, "1")
  const leftPort2 = getPort(symbols.battery_left, "2")
  expect(leftPort1.x).toBeGreaterThan(leftPort2.x)

  const upPort1 = getPort(symbols.battery_up, "1")
  const upPort2 = getPort(symbols.battery_up, "2")
  expect(upPort1.y).toBeLessThan(upPort2.y)

  const downPort1 = getPort(symbols.battery_down, "1")
  const downPort2 = getPort(symbols.battery_down, "2")
  expect(downPort1.y).toBeGreaterThan(downPort2.y)
})
