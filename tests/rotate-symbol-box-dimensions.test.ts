import { describe, expect, test } from "bun:test"
import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

const fixtures = [
  {
    name: "origin-centered box",
    center: { x: 0, y: 0 },
    boxCenter: { x: 0, y: 0 },
    expectedCenters: {
      right: { x: 0, y: 0 },
      left: { x: 0, y: 0 },
      up: { x: 0, y: 0 },
      down: { x: 0, y: 0 },
      omitted: { x: 0, y: 0 },
    },
  },
  {
    name: "off-origin box and rotation center",
    center: { x: 5, y: -3 },
    boxCenter: { x: 6, y: -1 },
    expectedCenters: {
      right: { x: 6, y: -1 },
      left: { x: 4, y: -5 },
      up: { x: 3, y: -2 },
      down: { x: 7, y: -4 },
      omitted: { x: 3, y: -2 },
    },
  },
]

const orientations = [
  { name: "right", newOrientation: "right", width: 4, height: 2 },
  { name: "left", newOrientation: "left", width: 4, height: 2 },
  { name: "up", newOrientation: "up", width: 2, height: 4 },
  { name: "down", newOrientation: "down", width: 2, height: 4 },
  { name: "omitted", newOrientation: undefined, width: 2, height: 4 },
] as const

describe("rotateRightFacingSymbol box dimensions", () => {
  for (const fixture of fixtures) {
    for (const orientation of orientations) {
      test(`${fixture.name}, ${orientation.name} orientation`, () => {
        const symbol: SchSymbol = {
          primitives: [
            {
              type: "box",
              ...fixture.boxCenter,
              width: 4,
              height: 2,
              anchor: "center",
            },
          ],
          center: { ...fixture.center },
          ports: [],
          size: { width: 4, height: 2 },
        }
        const original = structuredClone(symbol)

        const rotated = rotateRightFacingSymbol(symbol, {
          newOrientation: orientation.newOrientation,
        })
        const box = rotated.primitives.find(
          (primitive) => primitive.type === "box",
        )!
        const expectedCenter = fixture.expectedCenters[orientation.name]

        expect(rotated.primitives).toHaveLength(1)
        expect(box).toMatchObject({
          width: orientation.width,
          height: orientation.height,
          anchor: "center",
        })
        expect(box.x).toBeCloseTo(expectedCenter.x)
        expect(box.y).toBeCloseTo(expectedCenter.y)
        expect(rotated.size.width).toBeCloseTo(orientation.width)
        expect(rotated.size.height).toBeCloseTo(orientation.height)
        expect(rotated.center).toEqual(fixture.center)
        expect(symbol).toEqual(original)
      })
    }
  }
})
