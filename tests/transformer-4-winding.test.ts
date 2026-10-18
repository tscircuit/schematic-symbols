import { expect, test } from "bun:test"
import type { CirclePrimitive, PathPrimitive } from "../drawing/types"
import symbols from "../generated/symbols-index"

test("four-winding transformer orientations preserve winding terminals", () => {
  const expectedPinNumbers = [
    ["primary_end", "1"],
    ["primary_start", "2"],
    ["auxiliary_end", "3"],
    ["auxiliary_start", "4"],
    ["secondary2_start", "5"],
    ["secondary2_end", "6"],
    ["secondary1_start", "7"],
    ["secondary1_end", "8"],
  ] as const
  const windingTerminalAliases = [
    ["primary_start", "primary_end"],
    ["auxiliary_start", "auxiliary_end"],
    ["secondary1_start", "secondary1_end"],
    ["secondary2_start", "secondary2_end"],
  ] as const

  for (const orientation of ["right", "up", "left", "down"] as const) {
    const symbolName = ("transformer_4_winding_" +
      orientation) as keyof typeof symbols
    const transformer = symbols[symbolName]
    const windingTerminals = [
      "primary_start",
      "primary_end",
      "auxiliary_start",
      "auxiliary_end",
      "secondary1_start",
      "secondary1_end",
      "secondary2_start",
      "secondary2_end",
    ] as const

    expect(transformer.ports, symbolName).toHaveLength(8)
    const polarityDots = transformer.primitives.filter(
      (primitive): primitive is CirclePrimitive =>
        primitive.type === "circle" && primitive.fill,
    )
    const windingPaths = transformer.primitives.filter(
      (primitive): primitive is PathPrimitive =>
        primitive.type === "path" && primitive.points.length > 2,
    )
    expect(polarityDots, symbolName).toHaveLength(4)
    expect(windingPaths, symbolName).toHaveLength(4)
    for (const windingPath of windingPaths) {
      const windingEndpoints = [
        windingPath.points[0],
        windingPath.points[windingPath.points.length - 1],
      ]
      expect(
        windingEndpoints.every((endpoint) =>
          transformer.ports.some(
            (port) =>
              endpoint !== undefined &&
              Math.hypot(port.x - endpoint.x, port.y - endpoint.y) < 0.000001,
          ),
        ),
        symbolName + " continuous winding terminals",
      ).toBe(true)
    }
    for (const terminalAlias of windingTerminals) {
      expect(
        transformer.ports.some((port) => port.labels.includes(terminalAlias)),
        symbolName + " " + terminalAlias,
      ).toBeTrue()
    }
    for (const [terminalAlias, pinNumber] of expectedPinNumbers) {
      const terminal = transformer.ports.find((port) =>
        port.labels.includes(terminalAlias),
      )
      expect(terminal?.labels, symbolName + " " + terminalAlias).toContain(
        pinNumber,
      )
    }
    for (const [startAlias, endAlias] of windingTerminalAliases) {
      const startTerminal = transformer.ports.find((port) =>
        port.labels.includes(startAlias),
      )
      const endTerminal = transformer.ports.find((port) =>
        port.labels.includes(endAlias),
      )
      if (!startTerminal || !endTerminal) {
        throw new Error(`${symbolName} is missing ${startAlias} or ${endAlias}`)
      }
      const closestPolarityDot = polarityDots.reduce(
        (closestDot, candidateDot) => {
          const closestDotDistance = Math.hypot(
            closestDot.x - startTerminal.x,
            closestDot.y - startTerminal.y,
          )
          const candidateDotDistance = Math.hypot(
            candidateDot.x - startTerminal.x,
            candidateDot.y - startTerminal.y,
          )
          return candidateDotDistance < closestDotDistance
            ? candidateDot
            : closestDot
        },
      )
      const startDistanceFromDot = Math.hypot(
        closestPolarityDot.x - startTerminal.x,
        closestPolarityDot.y - startTerminal.y,
      )
      const endDistanceFromDot = Math.hypot(
        closestPolarityDot.x - endTerminal.x,
        closestPolarityDot.y - endTerminal.y,
      )
      expect(
        startDistanceFromDot,
        `${symbolName} ${startAlias} must be the dotted terminal`,
      ).toBeLessThan(endDistanceFromDot)
    }
  }
})
