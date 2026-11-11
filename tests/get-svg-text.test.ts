import { expect, test } from "bun:test"
import { getSvg } from "../drawing/getSvg"
import type { SchSymbol } from "../drawing/types"

const cases = [
  { name: "ASCII", text: "R1", serialized: "R1" },
  { name: "empty text", text: "", serialized: "" },
  { name: "Unicode", text: "电源 5 µV", serialized: "电源 5 µV" },
  {
    name: "quotes",
    text: `Pin "A" isn't used`,
    serialized: `Pin "A" isn't used`,
  },
  { name: "ampersand", text: "A & B", serialized: "A &amp; B" },
  { name: "less-than sign", text: "I < 0", serialized: "I &lt; 0" },
  { name: "closing brackets and greater-than", text: "]]>", serialized: "]]&gt;" },
] as const

for (const { name, text, serialized } of cases) {
  for (const surface of ["primitive", "port", "debug aliases"] as const) {
    test(`getSvg preserves ${name} as text in ${surface}`, () => {
      const symbol: SchSymbol = {
        center: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        primitives:
          surface === "primitive"
            ? [{ type: "text", text, x: 0.25, y: -0.1, anchor: "center" }]
            : [],
        ports:
          surface === "port"
            ? [{ x: -0.5, y: 0, labels: [text] }]
            : surface === "debug aliases"
              ? [{ x: -0.5, y: 0, labels: ["1", text] }]
              : [],
      }
      const options = {
        width: 150,
        height: 150,
        debug: surface === "debug aliases",
      }
      const original = structuredClone({ symbol, options })
      const svg = getSvg(symbol, options)
      const expected =
        surface === "debug aliases" ? `1 [${serialized}]` : serialized
      const contents = Array.from(
        svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g),
        (match) => match[1],
      )

      expect(contents).toContain(expected)
      expect({ symbol, options }).toEqual(original)
    })
  }
}

for (const { name, primaryLabel, serialized } of [
  { name: "ASCII", primaryLabel: "1", serialized: "1 [signal, return]" },
  {
    name: "ampersand",
    primaryLabel: "A & B",
    serialized: "A &amp; B [signal, return]",
  },
  {
    name: "less-than sign",
    primaryLabel: "I < 0",
    serialized: "I &lt; 0 [signal, return]",
  },
]) {
  test(`getSvg preserves ${name} in the debug primary label with aliases`, () => {
    const symbol: SchSymbol = {
      center: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      primitives: [],
      ports: [{ x: -0.5, y: 0, labels: [primaryLabel, "signal", "return"] }],
    }
    const options = { width: 150, height: 150, debug: true }
    const original = structuredClone({ symbol, options })
    const svg = getSvg(symbol, options)
    const contents = Array.from(
      svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g),
      (match) => match[1],
    )

    expect(contents).toContain(serialized)
    expect({ symbol, options }).toEqual(original)
  })
}
