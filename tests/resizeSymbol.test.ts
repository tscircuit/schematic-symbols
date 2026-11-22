import { describe, expect, it } from "bun:test"
import { resizeSymbol } from "../drawing/resizeSymbol"
import type { SchSymbol } from "../drawing/types"

const baseSymbol: SchSymbol = {
  primitives: [
    {
      type: "box",
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      anchor: "top_left",
    },
  ],
  center: { x: 5, y: 5 },
  ports: [],
  size: { width: 10, height: 10 },
}

describe("resizeSymbol", () => {
  it("scales explicit path stroke widths with the geometry", () => {
    const symbol: SchSymbol = {
      ...baseSymbol,
      primitives: [
        {
          type: "path",
          color: "primary",
          points: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
          strokeWidth: 0.1,
        },
        { type: "path", color: "primary", points: [], strokeWidth: 0 },
        { type: "path", color: "primary", points: [] },
      ],
    }
    const original = structuredClone(symbol)
    for (const options of [
      { width: 20 },
      { height: 20 },
      { width: 20, height: 30 },
    ]) {
      const resized = resizeSymbol(symbol, options)
      expect(resized.primitives[0]).toMatchObject({ strokeWidth: 0.2 })
      expect(resized.primitives[1]).toMatchObject({ strokeWidth: 0 })
      expect(resized.primitives[2]).not.toHaveProperty("strokeWidth")
    }
    expect(resizeSymbol(symbol, { width: 0 }).primitives[0]).toMatchObject({
      strokeWidth: 0,
    })
    expect(symbol).toEqual(original)
  })

  it("scales to zero when width is zero", () => {
    const resized = resizeSymbol(baseSymbol, { width: 0 })
    expect(resized.size.width).toBe(0)
    expect(resized.size.height).toBe(0)
    expect(resized.primitives[0]).toMatchObject({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })
  })

  it("scales to zero when height is zero", () => {
    const resized = resizeSymbol(baseSymbol, { height: 0 })
    expect(resized.size.width).toBe(0)
    expect(resized.size.height).toBe(0)
  })
})
