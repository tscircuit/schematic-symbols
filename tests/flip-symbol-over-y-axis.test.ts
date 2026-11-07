import { describe, expect, it } from "bun:test"
import { flipSymbolOverYAxis } from "../drawing/rotateSymbol"
import type { SchSymbol } from "../drawing/types"

describe("flipSymbolOverYAxis", () => {
  it("mirrors ports and primitives horizontally around a non-zero center.x without vertical translation", () => {
    const symbol: SchSymbol = {
      center: { x: 2, y: 3 },
      size: { width: 6, height: 9 },
      primitives: [
        {
          type: "path",
          points: [
            { x: 1, y: 2 },
            { x: 5, y: 7 },
          ],
          color: "primary",
          fill: false,
        },
        {
          type: "text",
          text: "REF",
          x: 4,
          y: 6,
          anchor: "top_left",
        },
        {
          type: "circle",
          x: 3,
          y: 5,
          radius: 1,
          fill: false,
          color: "primary",
        },
        {
          type: "box",
          x: 0,
          y: 1,
          width: 2,
          height: 4,
          anchor: "center",
        },
      ],
      ports: [
        { x: 5, y: 7, labels: ["1"] },
        { x: 2, y: -4, labels: ["axis"] },
      ],
    }

    const flipped = flipSymbolOverYAxis(symbol)

    expect(flipped.center).toEqual({ x: 2, y: 3 })
    expect(flipped.ports[0]).toEqual({ x: -1, y: 7, labels: ["1"] })
    // Points on the vertical mirror line x = center.x stay fixed
    expect(flipped.ports[1]).toEqual({ x: 2, y: -4, labels: ["axis"] })

    expect(flipped.primitives[0]).toEqual({
      type: "path",
      points: [
        { x: 3, y: 2 },
        { x: -1, y: 7 },
      ],
      color: "primary",
      fill: false,
    })

    expect(flipped.primitives[1]).toEqual({
      type: "text",
      text: "REF",
      x: 0,
      y: 6,
      anchor: "top_right",
    })

    expect(flipped.primitives[2]).toEqual({
      type: "circle",
      x: 1,
      y: 5,
      radius: 1,
      fill: false,
      color: "primary",
    })

    expect(flipped.primitives[3]).toEqual({
      type: "box",
      x: 4,
      y: 1,
      width: 2,
      height: 4,
      anchor: "center",
    })
  })

  it("restores the original symbol when applied twice for negative center.x", () => {
    const symbol: SchSymbol = {
      center: { x: -3.5, y: 4.25 },
      size: { width: 4, height: 4 },
      primitives: [
        {
          type: "path",
          points: [
            { x: -5, y: 1 },
            { x: -1, y: 8 },
          ],
          color: "primary",
          fill: false,
        },
        {
          type: "text",
          text: "VAL",
          x: -2,
          y: 3,
          anchor: "middle_left",
        },
      ],
      ports: [{ x: -1.5, y: 4.25, labels: ["OUT"] }],
    }

    const flippedOnce = flipSymbolOverYAxis(symbol)
    expect(flippedOnce.ports[0]).toEqual({ x: -5.5, y: 4.25, labels: ["OUT"] })
    expect(flippedOnce.primitives[1]).toEqual({
      type: "text",
      text: "VAL",
      x: -5,
      y: 3,
      anchor: "middle_right",
    })

    const flippedTwice = flipSymbolOverYAxis(flippedOnce)
    expect(flippedTwice).toEqual(symbol)
  })
})
