import { expect, test } from "bun:test"
import { defineSymbol } from "../drawing/defineSymbol"
import { getBoundsOfPrimitives } from "../drawing/utils/getBoundsOfPrimitives"

test("empty paths have finite zero bounds", () => {
  expect(
    getBoundsOfPrimitives([{ type: "path", points: [], color: "primary" }]),
  ).toEqual({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  })
})

test("empty paths do not affect bounds of actual geometry", () => {
  expect(
    getBoundsOfPrimitives([
      { type: "path", points: [], color: "primary" },
      {
        type: "circle",
        x: 10,
        y: 20,
        radius: 2,
        fill: false,
        color: "primary",
      },
    ]),
  ).toEqual({ minX: 8, maxX: 12, minY: 18, maxY: 22 })
})

test("defining a symbol with empty paths does not produce infinite dimensions", () => {
  const symbol = defineSymbol({
    center: { x: 0, y: 0 },
    ports: [],
    primitives: [{ type: "path", points: [], color: "primary" }],
  })
  expect(symbol.size).toEqual({ width: 0, height: 0 })
})
