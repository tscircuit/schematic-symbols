import { test, expect } from "bun:test"
import { defineSymbol } from "../drawing/defineSymbol"
import { resizeSymbol } from "../drawing/resizeSymbol"

test("resizes circle radius and text font size", () => {
  const symbol = defineSymbol({
    primitives: [
      { type: "circle", x: 10, y: 20, radius: 5, fill: false, color: "black" },
      {
        type: "text",
        x: 30,
        y: 40,
        text: "hi",
        fontSize: 12,
        anchor: "center",
      },
    ],
    center: { x: 0, y: 0 },
    ports: [],
  })

  const scaled = resizeSymbol(symbol, {
    width: symbol.size.width * 2,
    height: symbol.size.height * 2,
  })

  const circle = scaled.primitives.find(
    (p): p is (typeof symbol.primitives)[number] & { type: "circle" } =>
      p.type === "circle",
  )
  const text = scaled.primitives.find(
    (p): p is (typeof symbol.primitives)[number] & { type: "text" } =>
      p.type === "text",
  )

  expect(circle).toBeTruthy()
  expect(circle!.radius).toBe(10)
  expect(text).toBeTruthy()
  expect(text!.fontSize).toBe(24)
})
