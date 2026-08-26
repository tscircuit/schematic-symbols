import { expect, test } from "bun:test"
import type {
  PathPrimitive,
  Point,
  SchSymbol,
  TextPrimitive,
} from "../drawing/types"
import symbolIndex from "../generated/symbols-index"

const symbols = symbolIndex as Record<string, SchSymbol>

const orientations = ["right", "left", "up", "down"] as const
const sizeVariants = ["sm", "xs"] as const

type Orientation = (typeof orientations)[number]
type SizeVariant = (typeof sizeVariants)[number]
type PassiveFamily = "boxresistor" | "resistor" | "capacitor"

const families: PassiveFamily[] = ["boxresistor", "resistor", "capacitor"]

const pinSpans: Record<SizeVariant, number> = {
  sm: 0.5,
  xs: 0.35,
}

const bodyDimensions = {
  boxresistor: {
    sm: { width: 0.35, height: 0.15 },
    xs: { width: 0.28, height: 0.13 },
  },
  resistor: {
    sm: { width: 0.32, height: 0.19, vertices: 8 },
    xs: { width: 0.23, height: 0.19, vertices: 6 },
  },
} as const

const capacitorDimensions = {
  sm: { plateHeight: 0.32, gap: 0.12 },
  xs: { plateHeight: 0.28, gap: 0.1 },
} as const

const verticalCapacitorAnnotationX = 0.095

interface Segment {
  start: Point
  end: Point
}

const getSymbol = (
  family: PassiveFamily,
  size: SizeVariant | undefined,
  orientation: Orientation,
): SchSymbol => {
  const name = [family, size, orientation].filter(Boolean).join("_")
  const symbol = symbols[name]

  if (!symbol) throw new Error(`Missing symbol: ${name}`)

  return symbol
}

const getPort = (symbol: SchSymbol, number: "1" | "2") => {
  const matches = symbol.ports.filter((port) => port.labels.includes(number))
  expect(matches).toHaveLength(1)
  return matches[0]!
}

const pointsAreEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

const getPaths = (symbol: SchSymbol): PathPrimitive[] =>
  symbol.primitives.filter(
    (primitive): primitive is PathPrimitive => primitive.type === "path",
  )

const getAnnotation = (
  symbol: SchSymbol,
  text: "{REF}" | "{VAL}",
): TextPrimitive => {
  const annotation = symbol.primitives.find(
    (primitive): primitive is TextPrimitive =>
      primitive.type === "text" && primitive.text === text,
  )

  if (!annotation) throw new Error(`Missing annotation: ${text}`)

  return annotation
}

const getSegments = (symbol: SchSymbol): Segment[] =>
  getPaths(symbol).flatMap((path) =>
    path.points.slice(1).map((end, index) => ({
      start: path.points[index]!,
      end,
    })),
  )

const segmentTouchesPoint = (segment: Segment, point: Point) =>
  pointsAreEqual(segment.start, point) || pointsAreEqual(segment.end, point)

const getRightFacingGeometry = (symbol: SchSymbol) => {
  const ports = [getPort(symbol, "1"), getPort(symbol, "2")]
  const segments = getSegments(symbol)
  const leadSegments = segments.filter((segment) =>
    ports.some((port) => segmentTouchesPoint(segment, port)),
  )

  for (const port of ports) {
    expect(
      leadSegments.filter((segment) => segmentTouchesPoint(segment, port)),
    ).toHaveLength(1)
  }

  const bodySegments = segments.filter(
    (segment) => !leadSegments.includes(segment),
  )
  const bodyPoints = bodySegments.flatMap(({ start, end }) => [start, end])

  if (bodyPoints.length === 0) throw new Error("Symbol has no body geometry")

  const xs = bodyPoints.map(({ x }) => x)
  const ys = bodyPoints.map(({ y }) => y)
  const bodyBounds = {
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  }

  return {
    bodyBounds,
    bodyPoints,
    bodySegments,
    meanStemLength:
      leadSegments.reduce(
        (total, segment) => total + distance(segment.start, segment.end),
        0,
      ) / leadSegments.length,
  }
}

const getUniquePoints = (points: Point[]) => {
  const unique = new Map<string, Point>()

  for (const point of points) {
    unique.set(`${point.x},${point.y}`, point)
  }

  return [...unique.values()]
}

const expectPinDirection = (symbol: SchSymbol, orientation: Orientation) => {
  const pin1 = getPort(symbol, "1")
  const pin2 = getPort(symbol, "2")

  if (orientation === "right") expect(pin1.x).toBeLessThan(pin2.x)
  if (orientation === "left") expect(pin1.x).toBeGreaterThan(pin2.x)
  if (orientation === "up") expect(pin1.y).toBeLessThan(pin2.y)
  if (orientation === "down") expect(pin1.y).toBeGreaterThan(pin2.y)
}

test("compact passive variants preserve spans, pin direction, and lead connectivity", () => {
  for (const family of families) {
    for (const size of sizeVariants) {
      for (const orientation of orientations) {
        const symbol = getSymbol(family, size, orientation)
        const pin1 = getPort(symbol, "1")
        const pin2 = getPort(symbol, "2")

        expect(symbol.ports).toHaveLength(2)
        expect(distance(pin1, pin2)).toBeCloseTo(pinSpans[size], 12)
        expectPinDirection(symbol, orientation)

        const isHorizontal = orientation === "right" || orientation === "left"
        expect(symbol.size.width).toBeCloseTo(
          isHorizontal ? pinSpans[size] : 0.9,
          12,
        )
        expect(symbol.size.height).toBeCloseTo(
          isHorizontal ? 0.65 : pinSpans[size],
          12,
        )

        const pathEndpoints = getPaths(symbol).flatMap((path) => [
          path.points[0]!,
          path.points.at(-1)!,
        ])

        for (const port of symbol.ports) {
          expect(
            pathEndpoints.some((endpoint) => pointsAreEqual(endpoint, port)),
          ).toBe(true)
        }
      }
    }
  }
})

test("extra-small passives are shorter than small and default symbols", () => {
  for (const family of families) {
    for (const orientation of orientations) {
      const defaultSymbol = getSymbol(family, undefined, orientation)
      const smallSymbol = getSymbol(family, "sm", orientation)
      const extraSmallSymbol = getSymbol(family, "xs", orientation)
      const getPinSpan = (symbol: SchSymbol) =>
        distance(getPort(symbol, "1"), getPort(symbol, "2"))

      expect(getPinSpan(extraSmallSymbol)).toBeLessThan(getPinSpan(smallSymbol))
      expect(getPinSpan(smallSymbol)).toBeLessThan(getPinSpan(defaultSymbol))
    }
  }
})

test("compact capacitors preserve pin polarity aliases", () => {
  for (const size of sizeVariants) {
    for (const orientation of orientations) {
      const symbol = getSymbol("capacitor", size, orientation)

      expect(getPort(symbol, "1").labels).toContain("pos")
      expect(getPort(symbol, "1").labels).not.toContain("neg")
      expect(getPort(symbol, "2").labels).toContain("neg")
      expect(getPort(symbol, "2").labels).not.toContain("pos")
    }
  }
})

test("vertical compact capacitor annotations stay inside the plate span", () => {
  for (const size of sizeVariants) {
    for (const orientation of ["up", "down"] as const) {
      const symbol = getSymbol("capacitor", size, orientation)
      const ref = getAnnotation(symbol, "{REF}")
      const val = getAnnotation(symbol, "{VAL}")
      const plateHalfWidth = capacitorDimensions[size].plateHeight / 2

      expect(ref.x).toBe(verticalCapacitorAnnotationX)
      expect(val.x).toBe(verticalCapacitorAnnotationX)
      expect(ref.x).toBeLessThan(plateHalfWidth)
      expect(val.x).toBeLessThan(plateHalfWidth)
    }
  }
})

test("right-facing compact bodies keep their intended proportions while stems shrink faster", () => {
  for (const family of ["boxresistor", "resistor"] as const) {
    const defaultGeometry = getRightFacingGeometry(
      getSymbol(family, undefined, "right"),
    )
    const smallGeometry = getRightFacingGeometry(
      getSymbol(family, "sm", "right"),
    )
    const extraSmallGeometry = getRightFacingGeometry(
      getSymbol(family, "xs", "right"),
    )

    for (const size of sizeVariants) {
      const geometry = size === "sm" ? smallGeometry : extraSmallGeometry
      const expected = bodyDimensions[family][size]

      expect(geometry.bodyBounds.width).toBeCloseTo(expected.width, 12)
      expect(geometry.bodyBounds.height).toBeCloseTo(expected.height, 12)

      if (family === "resistor") {
        expect(getUniquePoints(geometry.bodyPoints)).toHaveLength(
          bodyDimensions.resistor[size].vertices,
        )
      }
    }

    expect(
      smallGeometry.meanStemLength / defaultGeometry.meanStemLength,
    ).toBeLessThan(
      smallGeometry.bodyBounds.width / defaultGeometry.bodyBounds.width,
    )
    expect(
      extraSmallGeometry.meanStemLength / smallGeometry.meanStemLength,
    ).toBeLessThan(
      extraSmallGeometry.bodyBounds.width / smallGeometry.bodyBounds.width,
    )
  }

  const capacitorGeometries = {
    default: getRightFacingGeometry(getSymbol("capacitor", undefined, "right")),
    sm: getRightFacingGeometry(getSymbol("capacitor", "sm", "right")),
    xs: getRightFacingGeometry(getSymbol("capacitor", "xs", "right")),
  }

  for (const size of sizeVariants) {
    const geometry = capacitorGeometries[size]
    const plateXs = getUniquePoints(geometry.bodyPoints)
      .map(({ x }) => x)
      .filter((x, index, all) => all.indexOf(x) === index)
      .sort((a, b) => a - b)

    expect(plateXs).toHaveLength(2)
    expect(plateXs[1]! - plateXs[0]!).toBeCloseTo(
      capacitorDimensions[size].gap,
      12,
    )

    for (const plateX of plateXs) {
      const ys = geometry.bodyPoints
        .filter(({ x }) => x === plateX)
        .map(({ y }) => y)

      expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(
        capacitorDimensions[size].plateHeight,
        12,
      )
    }
  }

  expect(
    capacitorGeometries.sm.meanStemLength /
      capacitorGeometries.default.meanStemLength,
  ).toBeLessThan(
    capacitorDimensions.sm.plateHeight /
      capacitorGeometries.default.bodyBounds.height,
  )
  expect(
    capacitorGeometries.xs.meanStemLength /
      capacitorGeometries.sm.meanStemLength,
  ).toBeLessThan(
    capacitorDimensions.xs.plateHeight / capacitorDimensions.sm.plateHeight,
  )
})
