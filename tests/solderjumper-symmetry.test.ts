import { test, expect } from "bun:test"
import solderjumper2_right from "../symbols/solderjumper2_right"
import solderjumper2_bridged12_right from "../symbols/solderjumper2_bridged12_right"

test("solderjumper2 ports and leads are symmetric (#405)", () => {
  const p1 = solderjumper2_right.ports.find((p) => p.labels.includes("1"))
  const p2 = solderjumper2_right.ports.find((p) => p.labels.includes("2"))

  expect(p1).toBeDefined()
  expect(p2).toBeDefined()

  expect(p1!.x).toBeCloseTo(-0.45, 3)
  expect(p2!.x).toBeCloseTo(0.45, 3)
  expect(p1!.y).toBeCloseTo(p2!.y, 3)

  expect(solderjumper2_right.center.x).toBeCloseTo(0, 3)
})

test("solderjumper2_bridged12 ports and leads are symmetric (#405)", () => {
  const p1 = solderjumper2_bridged12_right.ports.find((p) => p.labels.includes("1"))
  const p2 = solderjumper2_bridged12_right.ports.find((p) => p.labels.includes("2"))

  expect(p1).toBeDefined()
  expect(p2).toBeDefined()

  expect(p1!.x).toBeCloseTo(-0.45, 3)
  expect(p2!.x).toBeCloseTo(0.45, 3)
  expect(p1!.y).toBeCloseTo(p2!.y, 3)

  expect(solderjumper2_bridged12_right.center.x).toBeCloseTo(0, 3)
})
