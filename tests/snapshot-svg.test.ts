import { test, expect } from "bun:test"
import { getSvg } from "../drawing/getSvg"
import symbols from "../generated/symbols-index"
import "bun-match-svg"

test("Snapshot test for all SVG symbols", () => {
  const symbolEntries = Object.entries(symbols).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )

  for (const [name, symbol] of symbolEntries) {
    let svg
    try {
      svg = getSvg(symbol, { width: 150, height: 150, debug: true })
    } catch (e) {
      svg = `<div>Error generating SVG for ${name}: ${e?.toString()}</div>`
    }
    expect(svg).toMatchSvgSnapshot(import.meta.path, name)
  }
})
