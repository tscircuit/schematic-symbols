import { expect, test } from "bun:test"
import type { TextPrimitive } from "../drawing/types"
import symbols from "../generated/symbols-index"

const SOLDERJUMPER2_FAMILIES = [
  "solderjumper2",
  "solderjumper2_bridged12",
] as const

const SOLDERJUMPER3_FAMILIES = [
  "solderjumper3",
  "solderjumper3_bridged12",
  "solderjumper3_bridged23",
  "solderjumper3_bridged123",
] as const

test("solderjumper2 ports and center are symmetric and aligned with lead endpoints", () => {
  for (const family of SOLDERJUMPER2_FAMILIES) {
    const right = symbols[`${family}_right`]
    const left = symbols[`${family}_left`]
    const down = symbols[`${family}_down`]
    const up = symbols[`${family}_up`]

    expect(right.center).toEqual({ x: 0, y: -0.025 })
    expect(right.ports[0]?.x).toBeCloseTo(-0.45)
    expect(right.ports[1]?.x).toBeCloseTo(0.45)
    expect(right.ports[0]?.y).toBeCloseTo(-0.025)
    expect(right.ports[1]?.y).toBeCloseTo(-0.025)

    expect(left.ports[0]?.x).toBeCloseTo(0.45)
    expect(left.ports[1]?.x).toBeCloseTo(-0.45)
    expect(left.ports[0]?.y).toBeCloseTo(-0.025)
    expect(left.ports[1]?.y).toBeCloseTo(-0.025)

    expect(down.ports[0]?.x).toBeCloseTo(0)
    expect(down.ports[1]?.x).toBeCloseTo(0)
    expect(down.ports[0]!.y - down.center.y).toBeCloseTo(
      -(down.ports[1]!.y - down.center.y),
    )

    expect(up.ports[0]?.x).toBeCloseTo(0)
    expect(up.ports[1]?.x).toBeCloseTo(0)
    expect(up.ports[0]!.y - up.center.y).toBeCloseTo(
      -(up.ports[1]!.y - up.center.y),
    )
  }
})

test("solderjumper3 variants have symmetric ports and centered reference text", () => {
  for (const family of SOLDERJUMPER3_FAMILIES) {
    const right = symbols[`${family}_right`]
    const down = symbols[`${family}_down`]

    expect(right.center).toEqual({ x: 0, y: 0 })
    const pin1 = right.ports.find((p) => p.labels.includes("1"))!
    const pin2 = right.ports.find((p) => p.labels.includes("2"))!
    const pin3 = right.ports.find((p) => p.labels.includes("3"))!

    expect(pin1.x).toBeCloseTo(-pin3.x)
    expect(pin1.y).toBeCloseTo(pin3.y)
    expect(pin2.x).toBeCloseTo(0)

    const rightRef = right.primitives.find(
      (p): p is TextPrimitive => p.type === "text" && p.text === "{REF}",
    )!
    const downRef = down.primitives.find(
      (p): p is TextPrimitive => p.type === "text" && p.text === "{REF}",
    )!
    expect(rightRef.x).toBeCloseTo(0)
    expect(downRef.y).toBeCloseTo(0)
  }
})
