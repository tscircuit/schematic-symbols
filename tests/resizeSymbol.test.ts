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

