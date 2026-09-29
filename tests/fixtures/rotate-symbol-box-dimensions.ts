import { expect } from "bun:test"
import { rotateRightFacingSymbol } from "../../drawing/rotateSymbol"
import type { Point, SchSymbol } from "../../drawing/types"

export const originCenteredBox = {
  center: { x: 0, y: 0 },
  boxCenter: { x: 0, y: 0 },
}

export const offOriginBox = {
  center: { x: 5, y: -3 },
  boxCenter: { x: 6, y: -1 },
}

export const expectBoxRotation = ({
  fixture,
  newOrientation,
  expectedCenter,
  expectedSize,
}: {
  fixture: { center: Point; boxCenter: Point }
  newOrientation?: "up" | "down" | "left" | "right"
  expectedCenter: Point
  expectedSize: SchSymbol["size"]
}) => {
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

  const rotated = rotateRightFacingSymbol(symbol, { newOrientation })
  const box = rotated.primitives.find((primitive) => primitive.type === "box")!

  expect(rotated.primitives).toHaveLength(1)
  expect(box).toMatchObject({
    width: expectedSize.width,
    height: expectedSize.height,
    anchor: "center",
  })
  expect(box.x).toBeCloseTo(expectedCenter.x)
  expect(box.y).toBeCloseTo(expectedCenter.y)
  expect(rotated.size.width).toBeCloseTo(expectedSize.width)
  expect(rotated.size.height).toBeCloseTo(expectedSize.height)
  expect(rotated.center).toEqual(fixture.center)
  expect(symbol).toEqual(original)
}
