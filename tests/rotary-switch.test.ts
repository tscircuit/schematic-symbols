import { expect, test } from "bun:test"
import type { CirclePrimitive, PathPrimitive } from "../drawing/types"
import symbols from "../generated/symbols-index"
import { expectSymbolToBeYAxisMirror } from "./helpers/expect-symbol-to-be-y-axis-mirror"

const ROTARY_SWITCH_CONFIGS = [
  { base: "rotary_switch_1x3", poles: 1, positions: 3 },
  { base: "rotary_switch_1x4", poles: 1, positions: 4 },
  { base: "rotary_switch_1x6", poles: 1, positions: 6 },
  { base: "rotary_switch_1x12", poles: 1, positions: 12 },
  { base: "rotary_switch_2x6", poles: 2, positions: 6 },
  { base: "rotary_switch_3x4", poles: 3, positions: 4 },
  { base: "rotary_switch_4x3", poles: 4, positions: 3 },
] as const

test("rotary switch symbols follow KiCad SW_Rotary_NxM pin numbering and lead connectivity across orientations", () => {
  for (const { base, poles, positions } of ROTARY_SWITCH_CONFIGS) {
    const totalThrows = poles * positions
    const totalPorts = poles * (positions + 1)

    for (const orientation of ["right", "up", "left", "down"] as const) {
      const symbolName = `${base}_${orientation}` as keyof typeof symbols
      const symbol = symbols[symbolName]
      expect(symbol, symbolName).toBeDefined()
      expect(symbol.ports, symbolName).toHaveLength(totalPorts)

      const contactCircles = symbol.primitives.filter(
        (primitive): primitive is CirclePrimitive =>
          primitive.type === "circle" && !primitive.fill,
      )
      expect(contactCircles, `${symbolName} contact circles`).toHaveLength(
        totalPorts,
      )

      const paths = symbol.primitives.filter(
        (primitive): primitive is PathPrimitive => primitive.type === "path",
      )

      // Every port must sit on the outer endpoint of a terminal lead path
      for (const port of symbol.ports) {
        const connectedToLead = paths.some((pathPrimitive) => {
          const first = pathPrimitive.points[0]
          const last = pathPrimitive.points[pathPrimitive.points.length - 1]
          return (
            (first !== undefined &&
              Math.hypot(port.x - first.x, port.y - first.y) < 1e-6) ||
            (last !== undefined &&
              Math.hypot(port.x - last.x, port.y - last.y) < 1e-6)
          )
        })
        expect(
          connectedToLead,
          `${symbolName} port ${port.labels[0]} connected to lead`,
        ).toBe(true)

        const dx = Math.abs(port.x - symbol.center.x)
        const dy = Math.abs(port.y - symbol.center.y)
        if (orientation === "right" || orientation === "left") {
          expect(dx, `${symbolName} horizontal port dominance`).toBeGreaterThan(
            dy,
          )
        } else {
          expect(dy, `${symbolName} vertical port dominance`).toBeGreaterThan(
            dx,
          )
        }
      }

      // Check KiCad SW_Rotary_NxM throw pins 1 .. poles*positions and common pins poles*positions+1 .. poles*(positions+1)
      for (let pole = 1; pole <= poles; pole++) {
        const commonPin = String(totalThrows + pole)
        const commonAlias = poles === 1 ? "common" : `common${pole}`
        const commonPort = symbol.ports.find((port) =>
          port.labels.includes(commonPin),
        )
        expect(commonPort, `${symbolName} common ${commonPin}`).toBeDefined()
        expect(commonPort?.labels).toContain(commonAlias)
        expect(commonPort?.labels).toContain(`pole${pole}`)

        for (let pos = 1; pos <= positions; pos++) {
          const throwPin = String((pole - 1) * positions + pos)
          const throwAlias = poles === 1 ? `pos${pos}` : `p${pole}_pos${pos}`
          const throwPort = symbol.ports.find((port) =>
            port.labels.includes(throwPin),
          )
          expect(throwPort, `${symbolName} throw ${throwPin}`).toBeDefined()
          expect(throwPort?.labels).toContain(throwAlias)
        }
      }
    }

    // Verify top-to-bottom ordering in right-facing orientation matches KiCad SW_Rotary_NxM
    const rightSymbol = symbols[`${base}_right` as keyof typeof symbols]
    const throwYs = Array.from({ length: totalThrows }, (_, idx) => {
      const pin = String(idx + 1)
      const port = rightSymbol.ports.find((candidate) =>
        candidate.labels.includes(pin),
      )!
      expect(port.x).toBeGreaterThan(rightSymbol.center.x)
      return port.y
    })
    for (let i = 1; i < throwYs.length; i++) {
      expect(throwYs[i - 1], `${base}_right throw order`).toBeGreaterThan(
        throwYs[i]!,
      )
    }

    const commonYs = Array.from({ length: poles }, (_, idx) => {
      const pin = String(totalThrows + idx + 1)
      const port = rightSymbol.ports.find((candidate) =>
        candidate.labels.includes(pin),
      )!
      expect(port.x).toBeLessThan(rightSymbol.center.x)
      return port.y
    })
    for (let i = 1; i < commonYs.length; i++) {
      expect(commonYs[i - 1], `${base}_right common order`).toBeGreaterThan(
        commonYs[i]!,
      )
    }
  }
})

test("left-facing rotary switch symbols mirror right-facing symbols across Y axis", () => {
  for (const { base } of ROTARY_SWITCH_CONFIGS) {
    expectSymbolToBeYAxisMirror({
      rightFacingSymbol: symbols[`${base}_right` as keyof typeof symbols],
      leftFacingSymbol: symbols[`${base}_left` as keyof typeof symbols],
    })
  }
})
