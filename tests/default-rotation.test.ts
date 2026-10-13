import { expect, test } from "bun:test"
import { rotateRightFacingSymbol } from "../drawing/rotateSymbol"
import type { NinePointAnchor, SchSymbol } from "../drawing/types"

test("default rotation matches explicit up rotation without mutating input", () => {
  for (const anchor of [
    "middle_top",
    "middle_bottom",
    "middle_left",
    "middle_right",
    "center",
  ] satisfies NinePointAnchor[]) {
    const symbol: SchSymbol = {
      center: { x: 0, y: 0 },
      size: { width: 2, height: 2 },
      ports: [{ x: 1, y: 0, labels: ["1"] }],
      primitives: [
        { type: "text", text: "label", x: 1, y: 0, anchor },
        {
          type: "path",
          color: "black",
          points: [
            { x: -1, y: -1 },
            { x: 1, y: 1 },
          ],
        },
      ],
    }
    const original = structuredClone(symbol)
    expect(rotateRightFacingSymbol(symbol, {})).toEqual(
      rotateRightFacingSymbol(symbol, { newOrientation: "up" }),
    )
    expect(symbol).toEqual(original)
  }
})
